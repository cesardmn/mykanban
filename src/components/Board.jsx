// styles
import styles from '@styles/Board.module.css'

// components
import AddListButton from './ActionButton'

import { v4 as uuidv4 } from 'uuid'
import { useBoards } from '@providers/BoardsProvider'

import { fBoard } from '../helpers'
import ListContent from './ListContent'

export default function Board({ board }) {
  const localBoards = fBoard()
  const { setBoards } = useBoards()

  const handleNewList = (name) => {
    const list = {
      id: uuidv4(),
      name,
      cards: [],
      board: board.id,
      createdAt: Date.now(),
    }

    localBoards.addList(board, list)
    setBoards(localBoards.all())
  }

  return (
    <div className={styles.board}>
      {board.lists.length > 0 &&
        board.lists.map((list) => {
          return <ListContent list={list} key={list.id} />
        })}
      <div className={styles.listWrapper}>
        <AddListButton action={handleNewList}>+ add list</AddListButton>
      </div>
    </div>
  )
}
