// Minimal production server for Azure App Service (Linux, Node runtime).
// Serves the Vite build output (dist/) with cache headers tuned so a
// deploy is always picked up on next navigation, even by a browser tab
// that has been open since before the deploy:
//   - index.html: never cached, always revalidated with the server.
//   - hashed assets (/assets/*): cached forever, since a content change
//     always produces a new filename (Vite content hashing).
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.join(__dirname, 'dist')
// 8080 is taken locally by the Java backend, so default to 4173 (Vite's
// own "preview" port convention) instead. Azure App Service always
// injects its own PORT env var at runtime, so this default only matters
// for local `npm run start` and is otherwise ignored in production.
const port = process.env.PORT || 4173

const app = express()

app.use(
  '/assets',
  express.static(path.join(distDir, 'assets'), {
    immutable: true,
    maxAge: '1y',
  })
)

app.use(
  express.static(distDir, {
    index: false,
    setHeaders: (res) => {
      res.set('Cache-Control', 'no-cache, must-revalidate')
    },
  })
)

// SPA fallback: any non-file route (e.g. /supplier-onboarding/overview)
// serves index.html so React Router can take over client-side.
// Express 5's router no longer accepts a bare '*' path pattern, so this
// is a catch-all middleware instead of app.get('*', ...).
app.use((req, res) => {
  res.set('Cache-Control', 'no-cache, must-revalidate')
  res.sendFile(path.join(distDir, 'index.html'))
})

app.listen(port, () => {
  console.log(`Procurex server listening on port ${port}`)
})
