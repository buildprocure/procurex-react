import { useMemo } from 'react'
import { useAccessControl } from './useAccessControl'

// Left-nav items for one module, filtered from the access-control API
// response (see AccessControlProvider) instead of the old static
// per-role config/menuConfig.js - what renders here now matches what the
// backend says this user can actually open.
export function useMenu(moduleName) {
  const { menu } = useAccessControl()

  return useMemo(
    () => menu.filter((item) => item.module === moduleName),
    [menu, moduleName]
  )
}
