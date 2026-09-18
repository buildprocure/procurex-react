import { useContext } from 'react'
import { AccessControlContext } from '../../app/providers/AccessControlProvider/AccessControlProvider'

// Reads the access-control payload fetched once by AccessControlProvider.
// Throws if used outside the provider so a missing wrap-up shows up in dev
// immediately, instead of every menu silently rendering empty.
export function useAccessControl() {
  const context = useContext(AccessControlContext)
  if (context === null) {
    throw new Error('useAccessControl must be used within an AccessControlProvider')
  }
  return context
}
