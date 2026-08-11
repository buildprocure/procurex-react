# Module Loading Strategy: Code Splitting & Dependency Isolation

[[_TOC_]]

## Context

Procurex admin console is organized as separate modules (Supplier Onboarding, Customer Config, Purchase Orders, Compliance & Audit, Analytics & Reports, Vendor Invoice Processing, ...). We expect 12-15 modules over time, each potentially containing hundreds of pages, and each module may need libraries the others don't (charting library for Analytics, rich table library for Purchase Orders, PDF viewer for Compliance, etc.).

This doc answers: **does opening one module load code/dependencies from every other module too?** Answer: not if we follow the pattern below. This is our house rule for keeping the app fast as it scales to 12-15 modules.

## 1. The problem without code splitting

If every module's page components are statically imported at the top of `App.jsx`, the bundler has no choice but to include all of them in one JavaScript bundle. A user who only ever touches Supplier Onboarding still downloads and parses the code for every other module on first load. As we add modules, this bundle only grows — slower initial load, slower time-to-interactive, regardless of which module someone actually uses.

## 2. The fix: route-based code splitting with `React.lazy`

Instead of static imports, each module's pages are loaded dynamically via `React.lazy()` + `Suspense`. Vite/Rollup automatically creates a separate chunk at every `import()` boundary — no extra config required.

**Module-level split** (top-level router):

```jsx
// src/App.jsx
import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const DashboardPage = lazy(() => import('./modules/dashboard/pages/DashboardPage'))
const SupplierOnboardingRoutes = lazy(() => import('./modules/supplier-onboarding/routes'))
const CustomerConfigRoutes = lazy(() => import('./modules/customer-config/routes'))

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/supplier-onboarding/*" element={<SupplierOnboardingRoutes />} />
          <Route path="/customer-config/*" element={<CustomerConfigRoutes />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
```

**Page-level split within a module** (once a module has many pages, don't load them all just because one loaded):

```jsx
// src/modules/supplier-onboarding/routes.jsx
import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

const OverviewPage = lazy(() => import('./pages/OverviewPage'))
const AllSuppliersPage = lazy(() => import('./pages/AllSuppliersPage'))
const PendingApprovalPage = lazy(() => import('./pages/PendingApprovalPage'))
const ApprovedPage = lazy(() => import('./pages/ApprovedPage'))
const SettingsPage = lazy(() => import('./pages/SettingsPage'))

export function SupplierOnboardingRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="overview" element={<OverviewPage />} />
        <Route path="all" element={<AllSuppliersPage />} />
        <Route path="pending" element={<PendingApprovalPage />} />
        <Route path="approved" element={<ApprovedPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Routes>
    </Suspense>
  )
}
```

Result: visiting `/supplier-onboarding/overview` only fetches Overview's code. Customer Config's code is never downloaded. Within Supplier Onboarding itself, `/all` doesn't pull in Overview's code either.

Optional: pin always-needed framework code into a stable vendor chunk so it's cached once, in `vite.config.js`:

```js
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        vendor: ['react', 'react-dom', 'react-router-dom'],
      },
    },
  },
},
```

## 3. This relies on vertical slicing, not just lazy()

Code splitting only works cleanly because our modules are organized as **vertical slices** — each module folder (`modules/supplier-onboarding/`, `modules/customer-config/`, ...) owns its own pages, components, hooks, services, and styles end-to-end, instead of the codebase being organized by technical layer (`controllers/`, `services/`, `models/` at the top level, each mixing all modules together).

Vertical slicing is the architectural discipline (how we organize code). Code splitting is the technical payoff (how the bundler ships it). We need the former to reliably get the latter: because Supplier Onboarding doesn't reach into Customer Config's files and vice versa, the bundler's import graph naturally keeps them in separate chunks.

## 4. House rule: module-specific libraries stay inside their module

**Rule:** a library that only one module needs (chart library for Analytics, rich table for Purchase Orders, PDF viewer for Compliance) must only be imported from files inside that module's own folder — never from `shared/`, and never cross-imported by another module.

This is **not** about having separate `package.json` files per module. Keep one `package.json`, one `node_modules`, install the library normally. The isolation comes entirely from *where in the code you write the `import` statement* — Rollup traces the real import graph, not folder conventions or package boundaries.

### Why this matters: `shared/` and `App.jsx` are on the eager load path

Files like `App.jsx`, `shared/components/*`, layout shell components (`MainLayout`, `TopNav`, `LeftNav`) are imported by every module, often without a `lazy()` boundary in between. Anything imported there ships in the initial bundle for every user, no matter which module they use. The rule isn't "no libraries in `shared/`" — it's "don't let a module-specific library become reachable from a file that many modules (or the app shell) import."

### Good: shared component using a universal, tiny library

```jsx
// src/shared/components/Button.jsx
import clsx from 'clsx'
import './Button.css'

export function Button({ variant = 'primary', children, ...props }) {
  return (
    <button className={clsx('btn', `btn-${variant}`)} {...props}>
      {children}
    </button>
  )
}
```

Used from two different modules:

```jsx
// src/modules/supplier-onboarding/pages/AllSuppliersPage.jsx
import { Button } from '../../../shared/components/Button'
```

```jsx
// src/modules/customer-config/pages/CustomerConfigPage.jsx
import { Button } from '../../../shared/components/Button'
```

Rollup sees `Button` (and `clsx`) imported by two different lazy chunks and automatically extracts them into one small shared chunk both modules reference. `clsx` downloads once, cached, reused. No rule broken — every module needs this anyway, so there's no isolation to lose.

```
dist/
  vendor.js              (react, react-dom, react-router-dom)
  shared.js              (Button + clsx — loaded once, ~1KB)
  supplier-onboarding.js
  customer-config.js
```

### Bad: same shared component, now pulling in a module-specific library

```jsx
// src/shared/components/Button.jsx  ← don't do this
import clsx from 'clsx'
import { Sparkline } from 'recharts'   // module-specific library

export function Button({ variant, trend, children, ...props }) {
  return (
    <button className={clsx('btn', `btn-${variant}`)} {...props}>
      {children}
      {trend && <Sparkline data={trend} />}
    </button>
  )
}
```

Because `Button` is used by every module, `recharts` now rides along inside the same shared chunk that every module loads — including modules that never render a chart:

```
dist/
  vendor.js
  shared.js              (Button + clsx + recharts — now ~90KB)
  supplier-onboarding.js  ← pulls in shared.js, which drags in recharts
  customer-config.js     ← same, even though this page never shows a chart
```

**Fix:** keep the chart-rendering variant out of the shared `Button` entirely. If a module wants a "button with a trend graph," build that composition inside that module's own folder, wrapping the plain shared `Button`:

```jsx
// src/modules/analytics/components/TrendButton.jsx
import { Sparkline } from 'recharts'
import { Button } from '../../../shared/components/Button'

export function TrendButton({ trend, children, ...props }) {
  return (
    <Button {...props}>
      {children}
      <Sparkline data={trend} />
    </Button>
  )
}
```

Now `recharts` is only reachable from Analytics' own chunk.

### The actual test to apply

Before adding an import to a shared file, ask: **would every module need this dependency anyway?**

- Yes (e.g. `clsx`, a shared design-system utility, `date-fns`) → `shared/` is the right home, no downside, it was always going to load regardless.
- No (only one module genuinely needs it) → keep it inside that module's own folder, even if it would technically work sitting in a shared component. The moment a module-specific library is imported by a file with multiple importers across module boundaries, the bundler can no longer treat it as optional, and it ships to everyone.

## Summary

1. Lazy-load at the module level (`App.jsx` routes) and again at the page level (each module's own `routes.jsx`) so nobody downloads code for modules or pages they haven't opened.
2. Keep modules as true vertical slices — self-contained, no cross-module imports — because that's what makes the chunk isolation work in the first place.
3. One `package.json` for the whole app. Module-specific libraries live only inside that module's folder; never in `shared/`, never cross-imported by another module.
4. Before importing a library into a shared file, ask if every module needs it. If not, keep it local to the module that does.
