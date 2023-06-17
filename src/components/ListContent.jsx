import React from 'react'

import styles from '@styles/ListContent.module.css'
import AddListButton from './ActionButton'
import { useBoards } from '@providers/BoardsProvider'

import { fBoard } from '../helpers'
import { v4 as uuidv4 } from 'uuid'

export default function ListContent({ list }) {
  const localBoards = fBoard()
  const { setBoards } = useBoards()

  const handleNewCard = (name) => {
    const card = {
      id: uuidv4(),
      name,
      content: '',
      list: list.id,
      createdAt: Date.now(),
    }

    localBoards.addCard(card, list)
    setBoards(localBoards.all())
  }

  console.log(list.cards)

  return (
    <div className={styles.listContent}>
      <div className={styles.listHeader}>
        <input type="text" placeholder={list.name} />
      </div>
      {list.cards.map((card) => {
        return (
          <div className={styles.listCards} key={card.id}>
            <h3>{card.name}</h3>
            <p>{card.content}</p>
          </div>
        )
      })}

      {/* <div className={styles.cardCompose}>+ Adicionar um cartão</div> */}
      <AddListButton action={handleNewCard}>+ add card</AddListButton>
    </div>
  )
}
