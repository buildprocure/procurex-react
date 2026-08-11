// apiClient.js
// Calls the Java backend. Auth is via the session cookie the backend set
// after login - credentials: 'include' sends it along automatically.
// No token to manage on the frontend at all.

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'

export async function callApi(path, options = {}) {
  // Only set Content-Type when there's actually a body to describe. Setting
  // it unconditionally (even on plain GETs) turns every call into a
  // CORS-preflighted request, which strips cookies from that preflight and
  // can trip up auth if OPTIONS isn't explicitly permitted server-side.
  const headers = { ...(options.headers || {}) }
  if (options.body && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json'
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    credentials: 'include',
    headers,
  })

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`)
  }

  return response.json()
}
