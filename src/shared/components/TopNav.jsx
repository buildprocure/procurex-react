import { useNavigate } from 'react-router-dom'
import './TopNav.css'
import { logout } from '../../auth/auth'

export function TopNav({ userName = 'Alex Morgan' }) {
  const navigate = useNavigate()
  const companyName = import.meta.env.VITE_COMPANY_NAME
  const projectName = import.meta.env.VITE_PROJECT_NAME

  const handleLogout = () => {
    // TODO: Implement logout logic
    console.log('Logout clicked')
    logout()

  }

  const handleSettings = () => {
    // TODO: Implement settings navigation
    console.log('Settings clicked')
  }

  return (
    <header className="top-nav">
      <div className="nav-left">
        <h1 className="logo">{companyName}</h1>
        <span className="nav-divider">|</span>
        <span className="project-name">{projectName}</span>
      </div>

      <div className="nav-right">
        <button className="settings-btn" aria-label="Settings" onClick={handleSettings}>⚙️</button>
        <span className="user-name">{userName}</span>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  )
}
