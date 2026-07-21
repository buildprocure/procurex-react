import { ModuleLayout } from '../../../app/layouts/ModuleLayout/ModuleLayout'
import { useMenu } from '../../../shared/hooks/useMenu'
import '../styles/SupplierOnboardingPage.css'

export function SupplierOnboardingPage({ userRole = 'admin', userName = 'Alex Morgan' }) {
  const menuItems = useMenu('supplier-onboarding', userRole)

  return (
    <ModuleLayout menuItems={menuItems} userName={userName}>
      <div className="module-page">
        <h1>Supplier Onboarding</h1>
        <p>Manage and onboard new suppliers to your platform.</p>
        <div className="module-content-placeholder">
          <p>Module content will be added here...</p>
        </div>
      </div>
    </ModuleLayout>
  )
}