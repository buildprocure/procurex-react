import { useState } from 'react'
import { TopNav } from '../../../shared/components/TopNav'
import { LeftNav } from '../../../shared/components/LeftNav'
import { RightUserPanel } from '../../../shared/components/RightUserPanel'
import './ModuleLayout.css'

export function ModuleLayout({ children, menuItems, userName }) {
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false)

  return (
    <div className="module-layout">
      <TopNav userName={userName} onToggleRightPanel={() => setIsRightPanelOpen((prev) => !prev)} />
      <div className="module-body">
        <LeftNav menuItems={menuItems} />
        <main className="module-content">{children}</main>
        <aside className={`right-panel ${isRightPanelOpen ? 'open' : ''}`}>
          <RightUserPanel userName={userName} />
        </aside>
      </div>
    </div>
  )
}