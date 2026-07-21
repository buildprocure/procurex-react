import { TopNav } from '../../../shared/components/TopNav'
import './DashboardLayout.css'

export function DashboardLayout({ children, userName }) {
  return (
    <div className="dashboard-layout">
      <TopNav userName={userName} />
      <main className="dashboard-content">{children}</main>
    </div>
  )
}