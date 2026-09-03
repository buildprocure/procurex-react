import './TopNav.css'

export function TopNav({ onToggleRightPanel }) {
  const companyName = import.meta.env.VITE_COMPANY_NAME
  const projectName = import.meta.env.VITE_PROJECT_NAME

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
        {onToggleRightPanel && (
          <button className="hamburger-btn" aria-label="Toggle panel" onClick={onToggleRightPanel}>
            <span className="hamburger-icon">☰</span>
          </button>
        )}
      </div>
    </header>
  )
}