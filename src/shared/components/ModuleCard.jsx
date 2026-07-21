import { useNavigate } from 'react-router-dom'
import './ModuleCard.css'

export function ModuleCard({ card }) {
  const navigate = useNavigate()

  const isDisabled = card.status !== 'active'

  const handleClick = () => {
    if (!isDisabled) {
      navigate(card.path)
    }
  }

  return (
    <div
      className={`module-card ${card.status}`}
      onClick={handleClick}
      style={{ cursor: isDisabled ? 'not-allowed' : 'pointer' }}
    >
      <div className="card-content">
        <h3>{card.title}</h3>
        <p>{card.description}</p>
      </div>
      <div className="card-footer">
        <span className={`status-badge ${card.status}`}>
          {card.status === 'active' ? 'Active' : 'Coming Soon'}
        </span>
      </div>
    </div>
  )
}