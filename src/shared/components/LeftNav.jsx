import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import './LeftNav.css'

export function LeftNav({ menuItems }) {
  const location = useLocation()
  const [pinned, setPinned] = useState(false)

  return (
    <aside className={`left-nav ${pinned ? 'expanded' : ''}`}>
      <button
        className="nav-toggle"
        aria-label={pinned ? 'Collapse menu' : 'Expand menu'}
        onClick={() => setPinned((prev) => !prev)}
      >
        <span className="nav-toggle-icon">☰</span>
      </button>
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