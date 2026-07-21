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

Stack: Vite + React 19, JS/JSX (no TypeScript, router, or state library added yet). No test runner configured yet.
