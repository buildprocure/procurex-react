const AUTH_BASE_URL = import.meta.env.VITE_AUTH_BASE_URL || 'http://localhost:8080/auth'

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

export function login() {
  window.location.href = `${AUTH_BASE_URL}/login?redirect=${encodeURIComponent(window.location.origin)}`
}

export function logout() {
  window.location.href = `${AUTH_BASE_URL}/logout?redirect=${encodeURIComponent(window.location.origin)}`
}