import { useNavigate } from 'react-router-dom'
import './TopNav.css'

export function TopNav({ userName = 'Alex Morgan' }) {
  const navigate = useNavigate()
  const companyName = import.meta.env.VITE_COMPANY_NAME
  const projectName = import.meta.env.VITE_PROJECT_NAME

  const handleLogout = () => {
    // TODO: Implement logout logic
    console.log('Logout clicked')
    navigate('/')
  }

  const handleSettings = () => {
    // TODO: Implement settings navigation
    console.log('Settings clicked')
  }

  return (
    <header class="top-nav">
      <div class="nav-left">
        <h1 class="logo">{companyName}</h1>
        <span class="nav-divider">|</span>
        <span class="project-name">{projectName}</span>
      </div>

      <div class="nav-right">
        <button class="settings-btn" aria-label="Settings">⚙️</button>
        <span class="user-name">Alex Morgan</span>
        <button class="logout-btn">Logout</button>
      </div>
    </header>
  )
}
