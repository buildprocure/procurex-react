import './RightUserPanel.css'
import { logout } from '../../auth/auth'

export function RightUserPanel({ userName = 'Alex Morgan' }) {
  return (
    <div className="right-user-panel">
      <div className="user-info">
        <p className="user-label">Logged in as</p>
        <p className="user-name">{userName}</p>
      </div>
      <button className="logout-link" onClick={logout}>
        Logout
      </button>
    </div>
  )
}
