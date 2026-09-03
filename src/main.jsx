import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LoginPage } from './auth/LoginPage.jsx'
import { checkAuth, exchangeMsalToken } from './auth/auth'
import { msalClient, ensureMsalInitialized } from './auth/msalClient'

window.addEventListener('vite:preloadError', (event) => {
  event.preventDefault()
  const KEY = 'chunk-reload-at'
  const last = Number(sessionStorage.getItem(KEY) ?? 0)
  if (Date.now() - last > 10_000) {
    sessionStorage.setItem(KEY, String(Date.now()))
    window.location.reload()
  }
})

function renderApp(user) {
  createRoot(document.getElementById('root')).render(<App user={user} />)
}

function renderLogin() {
  createRoot(document.getElementById('root')).render(<LoginPage />)
}

async function bootstrap() {
  await ensureMsalInitialized()

  // Completes a loginRedirect() if the user was just sent back here from
  // Microsoft. Returns null on a normal page load with no redirect in
  // flight (e.g. a returning visitor with an existing session cookie).
  let redirectResult = null
  try {
    redirectResult = await msalClient.handleRedirectPromise()
  } catch (error) {
    console.error('MSAL redirect handling failed:', error)
  }

  if (redirectResult?.idToken) {
    try {
      const user = await exchangeMsalToken(redirectResult.idToken)
      renderApp(user)
      return
    } catch (error) {
      console.error('Failed to exchange MSAL token with backend:', error)
      renderLogin()
      return
    }
  }

  // No redirect in flight - fall back to the existing session cookie, if any.
  const user = await checkAuth()
  if (!user) {
    renderLogin()
    return
  }
  renderApp(user)
}

bootstrap()
