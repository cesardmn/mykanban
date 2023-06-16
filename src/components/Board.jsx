// styles
import styles from '@styles/Board.module.css'

// components
import AddListButton from './ActionButton'

export default function Board(board) {
  return (
    <div className={styles.board}>
      <div className={styles.listWrapper}>
        <AddListButton />
      </div>
    </div>
  )
}
