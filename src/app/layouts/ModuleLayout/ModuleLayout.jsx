import { TopNav } from '../../../shared/components/TopNav'
import { LeftNav } from '../../../shared/components/LeftNav'
import { RightUserPanel } from '../../../shared/components/RightUserPanel'
import './ModuleLayout.css'

export function ModuleLayout({ children, menuItems, userName }) {
  return (
    <div className="module-layout">
      <TopNav userName={userName} />
      <div className="module-body">
        <LeftNav menuItems={menuItems} />
        <main className="module-content">{children}</main>
        <aside className="right-panel">
          <RightUserPanel userName={userName} />
        </aside>
      </div>
    </div>
  )
}