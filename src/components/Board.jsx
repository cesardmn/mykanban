// styles
import styles from '@styles/Board.module.css'

// components
import Lists from './Lists'

// libs
import { v4 as uuidv4 } from 'uuid'
import { fBoard } from '../helpers'

//providers
import { useBoards } from '@providers/BoardsProvider'

export default function Board({ boardViewSelected }) {
  const localBoards = fBoard()
  const { setBoards } = useBoards()

  const boardView = localBoards.getBoardById(boardViewSelected.id)

  const handleNewList = (name) => {
    const list = {
      id: uuidv4(),
      name,
      cards: [],
      board: boardView.id,
      createdAt: Date.now(),
    }

    localBoards.addList(boardView.id, list)
    setBoards(localBoards.all())
  }

  return (
    <div className={styles.board}>
      <Lists boardViewSelected={boardViewSelected} />
    </div>
  )
}
