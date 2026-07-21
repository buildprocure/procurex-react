import './RightUserPanel.css'

export function RightUserPanel({ userName = 'Alex Morgan' }) {
  const handleLogout = () => {
    console.log('Logout from right panel')
    // TODO: Implement logout
  }

  return (
    <div className="right-user-panel">
      <div className="user-info">
        <p className="user-label">Logged in as</p>
        <p className="user-name">{userName}</p>
      </div>
      <button className="logout-link" onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}