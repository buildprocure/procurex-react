# procurex-react

BuildProcure's new React frontend. This is **not** a full port of the existing PHP app — it's a fresh app that hosts new modules, built and scoped independently, as the company moves off PHP incrementally. `procurex` (PHP) stays the source of truth for a given module's business logic until that module is migrated here.

## Modules planned/in progress

- **Supplier onboarding** — currently a manual process; legacy reference is `procurex/Supplier`. First module being built here.
- **Customer config** — planned, not started.
- (add new modules to this list as they're scoped)

Treat each module as its own vertical slice (routes, components, API client, types) rather than assuming shared scope across modules unless the code says otherwise.

## Related repos

- `procurex` — legacy PHP app; authoritative source for existing forms, validation, and DB schema for modules not yet migrated.
- `bp-simplesamlphp` — SAML auth service.
- `buildprocure_mcp_config` — internal MCP tooling for analyzing the PHP legacy code and generating migration scaffolding (`analyze_legacy_php_module`, `build_react_conversion_plan`, `generate_backend_api_bridge_files`, etc.).

## Development

```bash
npm run dev       # start Vite dev server
npm run build     # production build
npm run lint      # ESLint
npm run preview   # preview a production build locally
```

## UI Direction
Horizontal Nav which ontains Loggedin user name or Login button in first landing page. It will not have vertical navs (left right)
This landing page contains Cars of modules, supplier onboading, customer config and future others. These cards will be displayed based on the roles and access, so admin will have access to all cards, supplier has their own, buyer has their own and also there can be some cards subscription basis.
Once the user clicks on cars, it should open new page when we will have little different horizontal nav, and it should contains left nav, which should have menus and right nav which has log out and some other infos. So those three navs will be same across the modules on this app, so should be global similarly buttons and pagination if we have.

Login Authentication, two ways - SSO and from users table using java backend

## Backend
Backend for this react project should be in same Procurex PHP for now. Later I will move it to java.



Stack: Vite + React 19, JS/JSX (no TypeScript, router, or state library added yet). No test runner configured yet.
