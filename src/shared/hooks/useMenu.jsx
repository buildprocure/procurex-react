import { useMemo } from 'react'
import { menuConfig } from '../../config/menuConfig'

export function useMenu(moduleName, userRole = 'admin') {
  return useMemo(() => {
    const moduleMenu = menuConfig[moduleName]
    if (!moduleMenu) return []

    // Get role-specific menu or fallback to 'all'
    return moduleMenu[userRole] || moduleMenu.all || []
  }, [moduleName, userRole])
}