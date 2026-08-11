import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

const DashboardPage = lazy(() =>
  import('./modules/dashboard/pages/DashboardPage').then((m) => ({ default: m.DashboardPage }))
)
const SupplierOnboardingPage = lazy(() =>
  import('./modules/supplier-onboarding/pages/SupplierOnboardingPage').then((m) => ({
    default: m.SupplierOnboardingPage,
  }))
)
const CustomerConfigPage = lazy(() =>
  import('./modules/customer-config/pages/CustomerConfigPage').then((m) => ({
    default: m.CustomerConfigPage,
  }))
)
const AllSuppliersPage = lazy(() =>
  import('./modules/supplier-onboarding/pages/AllSuppliersPage').then((m) => ({
    default: m.AllSuppliersPage,
  }))
)

function NotFoundPage() {
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you requested does not exist.</p>
      <button onClick={() => window.history.back()}>Go Back</button>
    </div>
  )
}

function App({ user }) {
  // user comes from main.jsx's checkAuth() call against the Java backend.
  // userRole falls back to 'admin' until the backend actually sends real
  // roles - see Known gaps in the auth doc.
  const userName = user?.name || 'Unknown user'
  const userRole = user?.role || 'admin'

    console.log('Object User: ', user)
  return (
    <BrowserRouter>
      <Suspense fallback={<div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>}>
        <Routes>
          <Route path="/" element={<DashboardPage userRole={userRole} userName={userName} />} />
          <Route
            path="/supplier-onboarding"
            element={<SupplierOnboardingPage userRole={userRole} userName={userName} />}
          />
          <Route
            path="/supplier-onboarding/all"
            element={<AllSuppliersPage userRole={userRole} userName={userName} />}
          />
          <Route
            path="/customer-config"
            element={<CustomerConfigPage userRole={userRole} userName={userName} />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
