// providers
import { useBoards } from '@providers/BoardsProvider'
import { useDragCard } from '@providers/DragCardProvider'

// lib and helpers
import { fBoard } from '@src/helpers'

//components
import TrashButton from './TrashButton'
import Editor from './Editor'

//styles
import styles from '@styles/Card.module.css'
import { useState } from 'react'

export default function Card({ card }) {
  const { setBoards } = useBoards()
  const localBoards = fBoard()
  const cardView = localBoards.getCardById(card.id)

  const [showEditor, setShowEditor] = useState(false)
  const [isEditingName, setIsEditingName] = useState(false)
  const [editedName, setEditedName] = useState(cardView.name)
  const [runDrag, setRunDrag] = useState(false)

  const { setDragCard } = useDragCard()

  const handleDeleteCard = () => {
    localBoards.deleteCard(cardView.id)
    setBoards(localBoards.all())
  }

  const handleNameClick = () => {
    setIsEditingName(true)
  }

  const handleNameChange = (event) => {
    setEditedName(event.target.value)
  }

  const handleNameSubmit = () => {
    localBoards.cardNameUpdate(cardView.id, editedName)
    setBoards(localBoards.all())
    setIsEditingName(false)
  }

  const handleNameCancel = () => {
    setIsEditingName(false)
    setEditedName(cardView.name)
  }

  const closeEditor = () => {
    setShowEditor(false)
  }

  const handleDrag = (e) => {
    e.preventDefault()
  }

  const handleDragStart = (e) => {
    setDragCard(cardView)
    setRunDrag(true)
  }

  const handleDragEnd = (e) => {
    setRunDrag(false)
  }

  return (
    <li
      id={card.id}
      dragtype="card"
      className={`
      ${styles.card} 
      ${runDrag && styles.runDrag}
      `}
      draggable
      onDrag={(e) => handleDrag(e)}
      onDragStart={(e) => handleDragStart(e)}
      onDragEnd={(e) => handleDragEnd(e)}
    >
      <div className={styles.headerCard}>
        {isEditingName ? (
          <input
            type="text"
            value={editedName}
            onChange={handleNameChange}
            onBlur={handleNameSubmit}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleNameSubmit()
              } else if (event.key === 'Escape') {
                handleNameCancel()
              }
            }}
            autoFocus
          />
        ) : (
          <h4 onClick={handleNameClick}>{cardView.name}</h4>
        )}
        <div onClick={handleDeleteCard}>
          <TrashButton />
        </div>
      </div>
      <div className={styles.cardContent}>
        {showEditor && <Editor card={cardView} closeEditor={closeEditor} />}

        <span
          onClick={() => {
            setShowEditor(true)
          }}
        >
          {cardView.content.pure !== ''
            ? `${cardView.content.pure.substring(0, 25)} ...`
            : '+ add content'}
        </span>
      </div>
    </li>
  )
}
