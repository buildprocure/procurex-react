import { Link, useLocation } from 'react-router-dom'
import './LeftNav.css'

export function LeftNav({ menuItems }) {
  const location = useLocation()

  return (
    <aside className="left-nav">
      <nav className="menu">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`menu-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <span className="menu-icon">{item.icon}</span>
            <span className="menu-label">{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  )
}
