import React, { useEffect, useState, useRef } from 'react'

import styles from '@styles/ListContent.module.css'
import AddListButton from './ActionButton'
import { useBoards } from '@providers/BoardsProvider'
import { useCard } from '@providers/CardProvider'

import { fBoard } from '../helpers'
import { v4 as uuidv4 } from 'uuid'

import TrashButton from './TrashButton'
import Editor from './Editor'

export default function ListContent({ list }) {
  const localBoards = fBoard()
  const { setBoards } = useBoards()
  const { card, setCard } = useCard()

  const [listView, setListView] = useState()
  const [editedListName, setEditedListName] = useState(list.name)
  const [isEditingListName, setIsEditingListName] = useState(false)
  const [onEditor, setOnEditor] = useState(false)

  const inputRef = useRef(null)

  useEffect(() => {
    setListView(list)
  }, [list])

  const handleNewCard = (name) => {
    const newCard = {
      id: uuidv4(),
      name,
      content: {
        pure: '',
        formatted: '',
      },
      list: listView.id,
      createdAt: Date.now(),
    }

    localBoards.addCard(listView.id, newCard)
    setBoards(localBoards.all())
    const newList = localBoards.getListById(listView.id)
    setListView(newList)
  }

  const handleDeleteList = () => {
    localBoards.deleteList(listView.id)
    setBoards(localBoards.all())
    setListView(null)
  }

  const handleDeleteCard = (cardId) => {
    localBoards.deleteCard(cardId)
    const newList = localBoards.getListById(listView.id)
    setListView(newList)
  }

  const handleSaveListName = () => {
    localBoards.listNameUpdate(listView.id, editedListName)
    setListView({ ...listView, name: editedListName })
    setIsEditingListName(false)
    setBoards(localBoards.all())
  }

  const handleInputFocus = () => {
    setIsEditingListName(true)
    setEditedListName(listView.name)
  }

  const handleCloseEditor = (updatedContent) => {
    setOnEditor(false)
    setCard(null)
    if (updatedContent) {
      localBoards.cardContentUpdate(card.id, updatedContent)
    }
  }

  const handleEditor = (card) => {
    setCard(card)
    setOnEditor(true)
  }

  const handleListViewUpdate = (listView) => {
    setListView(listView)
  }

  useEffect(() => {
    if (isEditingListName && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditingListName])

  return (
    <>
      {listView && (
        <div className={styles.listContent}>
          <div className={styles.listHeader}>
            {isEditingListName ? (
              <input
                type="text"
                placeholder={listView.name}
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
              <h3 onClick={handleInputFocus}>{listView.name}</h3>
            )}
            <div onClick={handleDeleteList}>
              <TrashButton />
            </div>
          </div>

          <div className={`${styles.cardList} ${styles.noScrollBar}`}>
            {listView.cards.map((card) => (
              <div className={styles.card} key={card.id}>
                <div className={styles.cardHeader}>
                  <h3>{card.name}</h3>
                  <div onClick={() => handleDeleteCard(card.id)}>
                    <TrashButton />
                  </div>
                </div>
                <label htmlFor="content" onClick={() => handleEditor(card)}>
                  {card.content.pure === ''
                    ? '+ content'
                    : `${card.content.pure.substring(0, 15)}...`}
                </label>
              </div>
            ))}
          </div>
          <AddListButton action={handleNewCard}>+ add card</AddListButton>
        </div>
      )}

      {onEditor && (
        <Editor
          card={card}
          closeEditor={handleCloseEditor}
          listView={listView}
          listViewUpdate={handleListViewUpdate}
        />
      )}
    </>
  )
}
