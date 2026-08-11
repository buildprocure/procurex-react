import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LoginPage } from './auth/LoginPage.jsx'
import { checkAuth } from './auth/auth'

window.addEventListener('vite:preloadError', (event) => {
  event.preventDefault()
  const KEY = 'chunk-reload-at'
  const last = Number(sessionStorage.getItem(KEY) ?? 0)
  if (Date.now() - last > 10_000) {
    sessionStorage.setItem(KEY, String(Date.now()))
    window.location.reload()
  }
})

checkAuth().then((user) => {
  if (!user) {
    createRoot(document.getElementById('root')).render(<LoginPage />);
    return
  }

  createRoot(document.getElementById('root')).render(<App user={user} />)
})
