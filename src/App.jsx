import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { DashboardPage } from './modules/dashboard/pages/DashboardPage'
import { SupplierOnboardingPage } from './modules/supplier-onboarding/pages/SupplierOnboardingPage'
import { CustomerConfigPage } from './modules/customer-config/pages/CustomerConfigPage'
import './App.css'

function NotFoundPage() {
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you requested does not exist.</p>
      <button onClick={() => window.history.back()}>Go Back</button>
    </div>
  )
}

function App() {
  // TODO: Get userRole and userName from auth context in Phase 3
  const userRole = 'admin' // Change to 'supplier', 'buyer', 'csr' to test different roles
  const userName = 'Alex Morgan'

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage userRole={userRole} userName={userName} />} />
        <Route
          path="/supplier-onboarding"
          element={<SupplierOnboardingPage userRole={userRole} userName={userName} />}
        />
        <Route
          path="/customer-config"
          element={<CustomerConfigPage userRole={userRole} userName={userName} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App