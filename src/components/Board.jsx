// styles
import styles from '@styles/Board.module.css'

// components
import Lists from './Lists'

export default function Board({ boardViewSelected }) {
  return (
    <div className={styles.board}>
      <Lists boardViewSelected={boardViewSelected} />
    </div>
  )
}
