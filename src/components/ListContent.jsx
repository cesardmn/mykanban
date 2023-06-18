import React, { useEffect, useState } from 'react'

import styles from '@styles/ListContent.module.css'
import AddListButton from './ActionButton'
import { useBoards } from '@providers/BoardsProvider'

import { fBoard } from '../helpers'
import { v4 as uuidv4 } from 'uuid'

export default function ListContent({ list }) {
  const localBoards = fBoard()
  const { setBoards } = useBoards()

  const [listView, setListView] = useState()

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

  return (
    <>
      {listView && (
        <div className={styles.listContent}>
          <div className={styles.listHeader}>
            <input type="text" placeholder={listView.name} />
            <button onClick={handleDeleteList}>x</button>
          </div>
          {listView.cards.map((card) => {
            return (
              <div className={styles.listCards} key={card.id}>
                <div>
                  <h3>{card.name}</h3>
                  <button
                    onClick={() => {
                      handleDeleteCard(card.id)
                    }}
                  >
                    x
                  </button>
                </div>
                <p>{card.content}</p>
              </div>
            )
          })}

          {/* <div className={styles.cardCompose}>+ Adicionar um cartão</div> */}
          <AddListButton action={handleNewCard}>+ add card</AddListButton>
        </div>
      )}
    </>
  )
}
