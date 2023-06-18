import React, { useEffect, useState, useRef } from 'react'

import styles from '@styles/ListContent.module.css'
import AddListButton from './ActionButton'
import { useBoards } from '@providers/BoardsProvider'

import { fBoard } from '../helpers'
import { v4 as uuidv4 } from 'uuid'

import { TbTrashX } from 'react-icons/tb'
import TrashButton from './TrashButton'

export default function ListContent({ list }) {
  const localBoards = fBoard()
  const { setBoards } = useBoards()

  const [listView, setListView] = useState()
  const [editedListName, setEditedListName] = useState(list.name)
  const [isEditingListName, setIsEditingListName] = useState(false)

  const inputRef = useRef(null)

  useEffect(() => {
    setListView(list)
  }, [])

  const handleNewCard = (name) => {
    const card = {
      id: uuidv4(),
      name,
      content: '',
      list: listView.id,
      createdAt: Date.now(),
    }

    localBoards.addCard(listView.id, card)
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
            {listView.cards.map((card) => {
              return (


                <div className={styles.card} key={card.id}>
                  <div className={styles.cardHeader} >
                    <h3>{card.name}</h3>
                    <div onClick={() => handleDeleteCard(card.id)}>
                      <TrashButton />
                    </div>
                  </div>
                  <p>{card.content}</p>
                </div>



              )
            })}
          </div>
          <AddListButton action={handleNewCard}>+ add card</AddListButton>
        </div>
      )}
    </>
  )
}
