import { createContext, useEffect, useState } from 'react'
import { fetchAccessControl } from '../../../shared/services/accessControlService'

export const AccessControlContext = createContext(null)

const EMPTY_STATE = {
  menu: [],
  pagesExcluded: [],
  buttonsExcluded: [],
  role: null,
  status: 'loading', // 'loading' | 'error' | 'ready'
  error: null,
}

// Fetches the logged-in user's full access-control payload (menu +
// pages_excluded + buttons_excluded) once per session from
// GET /api/access-control/{userId}, and makes it available to every module
// via useAccessControl() / useMenu() - instead of each page working out
// its own nav from a hardcoded config file.
export function AccessControlProvider({ userId, children }) {
  const [state, setState] = useState(EMPTY_STATE)

  useEffect(() => {
    if (!userId) {
      setState({ ...EMPTY_STATE, status: 'ready' })
      return
    }

    let cancelled = false
    setState((prev) => ({ ...prev, status: 'loading' }))

    fetchAccessControl(userId)
      .then((data) => {
        if (cancelled) return
        setState({
          menu: data.menu || [],
          pagesExcluded: data.pages_excluded || [],
          buttonsExcluded: data.buttons_excluded || [],
          role: data.role || null,
          status: 'ready',
          error: null,
        })
      })
      .catch((error) => {
        if (cancelled) return
        console.error('Failed to load access control:', error)
        setState((prev) => ({ ...prev, status: 'error', error: error.message }))
      })

    return () => {
      cancelled = true
    }
  }, [userId])

  return <AccessControlContext.Provider value={state}>{children}</AccessControlContext.Provider>
}
