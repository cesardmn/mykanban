// styles
import styles from '@styles/Board.module.css'

// components
import AddListButton from './ActionButton'

import { v4 as uuidv4 } from 'uuid'

import { fBoard } from '../helpers'

export default function Board({ board }) {
  const localBoards = fBoard()

  const handleNewList = (name) => {
    const list = {
      id: uuidv4(),
      name,
      cards: [],
      createdAt: Date.now(),
    }

    const localBoard = localBoards.addList(board, list)
  }

  return (
    <div className={styles.board}>
      <div className={styles.listWrapper}>
        <AddListButton action={handleNewList}>+ add list</AddListButton>
      </div>
    </div>
  )
}
