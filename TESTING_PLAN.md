# Testing Plan — procurex-react

Status: proposal, no tests exist yet. This is the plan to review before implementation starts.

## Current state

- Vite + React 19, plain JS/JSX (no TypeScript, despite `@types/react` being present — those are for editor intellisense only).
- Module-based structure: `src/modules/{customer-config,dashboard,supplier-onboarding}`, plus `src/shared` (components, hooks, services) and `src/auth`.
- Real logic worth testing already exists in `src/auth/auth.js` and `src/auth/apiClient.js` (fetch wrappers, cookie-based session auth) and `src/shared/hooks/useMenu.jsx`.
- Most module pages (`CustomerConfigPage`, `DashboardPage`, `SupplierOnboardingPage`) are still placeholders — low value to test deeply right now, but worth a render smoke test each.
- CI (`.github/workflows/azure-static-web-apps-*.yml`) only builds and deploys — no test gate today.

## Toolchain

| Purpose | Tool | Why |
|---|---|---|
| Test runner | **Vitest** | Native Vite integration, shares config/transform pipeline, fast, Jest-compatible API |
| Component testing | **@testing-library/react** | Tests behavior/DOM output, not implementation details |
| DOM environment | **jsdom** | Runs React components outside a browser |
| Assertions | **@testing-library/jest-dom** | `toBeInTheDocument()`, `toHaveTextContent()`, etc. |
| User interaction | **@testing-library/user-event** | Realistic click/type/form simulation |
| Network mocking | **MSW** (Mock Service Worker) | Intercepts `fetch` at the network level — fits `apiClient.js`/`auth.js` directly, no need to mock `fetch` by hand |
| Coverage | Vitest's built-in `v8` provider | No extra dependency |

## Setup (when we move to implementation)

```bash
pnpm add -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom msw
```

`vite.config.js` gets a `test` block (Vitest reads it from the same file):

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    globals: true,
    css: false,
  },
})
```

`src/test/setup.js`:

```js
import '@testing-library/jest-dom/vitest'
```

`package.json` scripts:

```json
"test": "vitest run",
"test:watch": "vitest",
"test:coverage": "vitest run --coverage"
```

## Conventions

- **Colocate tests** with source: `Foo.jsx` → `Foo.test.jsx` in the same folder. Matches the existing module-based layout better than a parallel `__tests__` tree.
- Name test files `*.test.jsx` / `*.test.js`.
- One `describe` block per unit (function, hook, or component); test names read as behavior, not implementation (`"logs out and redirects when logout() is called"`, not `"calls window.location.href"`).
- Mock the network with MSW handlers, not by stubbing `fetch` directly — keeps tests resilient to how `apiClient.js` is implemented internally.

## What to test first (priority order)

1. **`src/auth/apiClient.js`** — `callApi` success path, non-OK response throws, request includes `credentials: 'include'` and JSON headers. Pure logic, no rendering, highest value per test.
2. **`src/auth/auth.js`** — `checkAuth` returns parsed JSON on 200, returns `null` on non-OK and on network failure; `login`/`logout` build the correct redirect URL.
3. **`src/shared/hooks/useMenu.jsx`** — returns the right menu items per module/role combination.
4. **`src/shared/components/*`** (`LeftNav`, `TopNav`, `ModuleCard`, `RightUserPanel`) — render with props, verify expected text/links appear, verify click handlers fire.
5. **Module pages** — one smoke test per page (`renders without crashing`, key heading is present) until real functionality lands, then expand alongside that functionality.
6. **`src/app/router`** — route table renders the right page component for each path, redirects unauthenticated users where applicable.

Items 1–3 have zero UI dependency, so they're the cheapest place to actually practice TDD (write the failing test, then the implementation change, then refactor) as new logic gets added to them.

## TDD workflow going forward

For any new logic (new API call, new hook, new component behavior):

1. Write a failing test describing the behavior you want.
2. Run `pnpm test:watch`, confirm it fails for the right reason.
3. Write the minimum code to pass.
4. Refactor with the test as a safety net.
5. Commit test + implementation together.

Retrofitting: don't try to backfill 100% coverage on day one. Write tests for `apiClient.js`/`auth.js` now (they're stable and won't change shape), and require tests on every new PR from here on — coverage grows with the codebase instead of blocking it.

## CI

Add a `test` job to a new workflow (or a step before the existing Azure deploy job) that runs on every PR:

```yaml
- run: corepack enable && corepack prepare pnpm@11.18.0 --activate
- run: pnpm install --frozen-lockfile
- run: pnpm lint
- run: pnpm test:coverage
```

Gate merges on this passing before the Azure deploy workflow's PR checks are considered green.

## Open questions for you

- Any coverage threshold you want enforced (e.g. fail CI below 70%), or coverage-optional for now?
- OK to add MSW as a dependency, or prefer hand-rolled `vi.fn()` mocks for `fetch` instead?
