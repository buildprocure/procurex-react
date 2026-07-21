import { useState, useEffect, useMemo } from 'react'
import { DashboardLayout } from '../../../app/layouts/MainLayout/DashboardLayout'
import { ModuleCard } from '../../../shared/components/ModuleCard'
import { modulesCardsConfig } from '../../../config/modulesCardsConfig'
import '../styles/DashboardPage.css'

export function DashboardPage({ userRole = 'admin', userName = 'Alex Morgan' }) {
  const baseCards = modulesCardsConfig[userRole] || modulesCardsConfig.admin
  const [cards, setCards] = useState(baseCards)
  const [draggedCard, setDraggedCard] = useState(null)
  const [dragOverCard, setDragOverCard] = useState(null)

  // Load card order from localStorage on mount
  useEffect(() => {
    const savedOrder = localStorage.getItem(`cardOrder_${userRole}`)
    if (savedOrder) {
      try {
        const cardIds = JSON.parse(savedOrder)
        const reorderedCards = cardIds
          .map(id => baseCards.find(c => c.id === id))
          .filter(Boolean)
        // Add any new cards that weren't in saved order
        const savedIds = new Set(reorderedCards.map(c => c.id))
        const newCards = baseCards.filter(c => !savedIds.has(c.id))
        setCards([...reorderedCards, ...newCards])
      } catch (e) {
        setCards(baseCards)
      }
    } else {
      setCards(baseCards)
    }
  }, [userRole, baseCards])

  const handleDragStart = (e, card) => {
    setDraggedCard(card)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e, card) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setDragOverCard(card.id)
  }

  const handleDrop = (e, targetCard) => {
    e.preventDefault()
    
    if (!draggedCard || draggedCard.id === targetCard.id) {
      setDraggedCard(null)
      setDragOverCard(null)
      return
    }

    const draggedIndex = cards.findIndex(c => c.id === draggedCard.id)
    const targetIndex = cards.findIndex(c => c.id === targetCard.id)

    const newCards = [...cards]
    const [movedCard] = newCards.splice(draggedIndex, 1)
    newCards.splice(targetIndex, 0, movedCard)

    setCards(newCards)
    
    // Save order to localStorage
    const cardIds = newCards.map(c => c.id)
    localStorage.setItem(`cardOrder_${userRole}`, JSON.stringify(cardIds))

    setDraggedCard(null)
    setDragOverCard(null)
  }

  const handleDragEnd = () => {
    setDraggedCard(null)
  }

  const handleDragLeave = () => {
  setDragOverCard(null)
}
  return (
    <DashboardLayout userName={userName}>
      <div className="dashboard-page">
        <div className="cards-grid">
          {cards.map((card) => (
            <div
                key={card.id}
                draggable
                onDragStart={(e) => handleDragStart(e, card)}
                onDragOver={(e) => handleDragOver(e, card)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, card)}
                onDragEnd={handleDragEnd}
                className={`card-wrapper ${
                    draggedCard?.id === card.id ? 'dragging' : ''
                } ${dragOverCard === card.id ? 'drag-over' : ''}`}
            >
              <ModuleCard card={card} />
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}