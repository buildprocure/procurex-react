import { useState, useEffect } from 'react'
import { ModuleLayout } from '../../../app/layouts/ModuleLayout/ModuleLayout'
import { useMenu } from '../../../shared/hooks/useMenu'
import { callApi } from '../../../auth/apiClient'
import '../styles/SupplierOnboardingPage.css'
import '../styles/AllSuppliersPage.css'

// Fetches from GET /api/suppliers via apiClient (credentials: 'include'),
// so the auth_token cookie set at login rides along automatically.
// A 401 here means the cookie is missing/expired - useful for testing the
// auth handshake end to end.
export function AllSuppliersPage({ userRole = 'admin', userName = 'Alex Morgan' }) {
  const menuItems = useMenu('supplier-onboarding')
  const [suppliers, setSuppliers] = useState([])
  const [status, setStatus] = useState('loading') // 'loading' | 'error' | 'ready'
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let cancelled = false

    callApi('/suppliers')
      .then((data) => {
        if (cancelled) return
        setSuppliers(data)
        setStatus('ready')
      })
      .catch((error) => {
        if (cancelled) return
        console.error('Failed to load suppliers:', error)
        setErrorMessage(error.message)
        setStatus('error')
      })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <ModuleLayout menuItems={menuItems} userName={userName}>
      <div className="module-page">
        <h1>All Suppliers</h1>
        <p>Live from the backend via GET /api/suppliers.</p>

        {status === 'loading' && (
          <div className="module-content-placeholder">
            <p>Loading suppliers...</p>
          </div>
        )}

        {status === 'error' && (
          <div className="module-content-placeholder">
            <p>Could not load suppliers: {errorMessage}</p>
            <p>A 401 here usually means the auth_token cookie is missing or expired - check the Network tab and try logging in again.</p>
          </div>
        )}

        {status === 'ready' && (
          <table className="suppliers-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Status</th>
                <th>Contact</th>
                <th>Onboarded</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((s) => (
                <tr key={s.id}>
                  <td>{s.id}</td>
                  <td>{s.name}</td>
                  <td>{s.category}</td>
                  <td>
                    <span className={`status-badge status-${s.status.toLowerCase()}`}>{s.status}</span>
                  </td>
                  <td>{s.contactEmail}</td>
                  <td>{s.onboardedDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </ModuleLayout>
  )
}
