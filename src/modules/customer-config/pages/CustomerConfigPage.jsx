import { ModuleLayout } from '../../../app/layouts/ModuleLayout/ModuleLayout'
import { useMenu } from '../../../shared/hooks/useMenu'
import '../styles/CustomerConfigPage.css'

export function CustomerConfigPage({ userRole = 'admin', userName = 'Alex Morgan' }) {
  const menuItems = useMenu('customer-config', userRole)

  return (
    <ModuleLayout menuItems={menuItems} userName={userName}>
      <div className="module-page">
        <h1>Customer Config</h1>
        <p>Configure customer accounts and settings.</p>
        <div className="module-content-placeholder">
          <p>Module content will be added here...</p>
        </div>
      </div>
    </ModuleLayout>
  )
}