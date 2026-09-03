import { msalClient, ensureMsalInitialized } from './msalClient'
import { loginRequest } from './msalConfig'

const AUTH_BASE_URL = import.meta.env.VITE_AUTH_BASE_URL || 'http://localhost:8080/auth'

// Backend session check - unchanged from the backend-mediated flow. Every
// request after login (regardless of how the user signed in) is
// authenticated via the auth_token HttpOnly cookie, so this still just
// asks the backend "who am I, if anyone".
export async function checkAuth() {
  let response
  try {
    response = await fetch(`${AUTH_BASE_URL}/me`, { credentials: 'include' })
  } catch (error) {
    console.error('Could not reach backend to check session:', error)
    return null
  }

  if (response?.ok) {
    return response.json()
  }

  return null
}

// Kicks off the MSAL redirect flow - navigates away to Microsoft's login
// page. On return, main.jsx's handleRedirectPromise() picks up where this
// left off and exchanges the resulting ID token for a backend session.
export async function login() {
  await ensureMsalInitialized()
  await msalClient.loginRedirect(loginRequest)
}

// Called once, from main.jsx, right after MSAL completes a redirect login.
// Trades the Microsoft ID token for our own auth_token session cookie.
export async function exchangeMsalToken(idToken) {
  const response = await fetch(`${AUTH_BASE_URL}/msal-login`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idToken }),
  })

  if (!response.ok) {
    throw new Error(`MSAL token exchange failed: ${response.status}`)
  }

  return response.json()
}

// Clears the backend session cookie and ends the Microsoft session too
// (backend redirects through login.microsoftonline.com's own logout
// endpoint using the id_token_hint captured at login, then back here).
export function logout() {
  window.location.href = `${AUTH_BASE_URL}/logout`
}
