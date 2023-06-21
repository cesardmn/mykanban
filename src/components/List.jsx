import { useRef, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { useBoards } from '@providers/BoardsProvider'
import { useDragCard } from '@providers/DragCardProvider'

import { fBoard } from '../helpers/index'
import styles from '@styles/List.module.css'
import TrashButton from './TrashButton'
import ActionButton from './ActionButton'
import Card from './Card'

export default function List({ list }) {
  const { setBoards } = useBoards()
  const localBoards = fBoard()

  const [isEditingListName, setIsEditingListName] = useState(false)
  const [editedListName, setEditedListName] = useState(list.name)

  const inputRef = useRef(null)

  const { dragCard, setDragCard } = useDragCard()

  const handleInputFocus = () => {
    setIsEditingListName(true)
  }

  const handleDeleteList = () => {
    localBoards.deleteList(list.id)
    setBoards(localBoards.all())
  }

  const handleSaveListName = () => {
    localBoards.listNameUpdate(list.id, editedListName)
    setIsEditingListName(false)
    setBoards(localBoards.all())
  }

  const handleAddCard = (name) => {
    const newCard = {
      id: uuidv4(),
      name,
      content: {
        pure: '',
        formatted: '',
      },
      list: list.id,
      createdAt: Date.now(),
      type: 'card'
    }

    localBoards.addCard(list.id, newCard)
    setBoards(localBoards.all())
  }

  useEffect(() => {
    if (isEditingListName && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditingListName])

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const destinyListId = e.target.getAttribute('id')
    const cardId = dragCard.id

    const card = localBoards.getCardById(cardId)
    localBoards.deleteCard(cardId)
    card.list = destinyListId

    localBoards.addCard(destinyListId, card)
    setBoards(localBoards.all())
  }

  return (
    <li className={styles.listContent}>
      <div className={styles.listHeader}>
        {isEditingListName ? (
          <input
            type="text"
            placeholder={list.name}
            value={editedListName}
            onChange={(e) => setEditedListName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSaveListName()
              }
            }}
            onBlur={handleSaveListName}
            ref={inputRef}
          />
        ) : (
          <h3 onClick={handleInputFocus}>{list.name}</h3>
        )}
        <div onClick={handleDeleteList}>
          <TrashButton />
        </div>
      </div>

      <ul
        id={list.id}
        name={list.name}
        className={styles.cardList}
        draggable
        onDragOver={(e) => {
          handleDragOver(e)
        }}
        onDrop={(e) => handleDrop(e)}
      >
        {list.cards.map((card) => (
          <Card card={card} key={card.id} />
        ))}
      </ul>
      <ActionButton action={handleAddCard}>+ Add Card</ActionButton>
    </li>
  )
}
