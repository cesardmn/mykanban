// styles
import styles from '@styles/Board.module.css'

export default function Board() {
  return (
    <div className={styles.board}>
      <div className={styles.listWrapper}>
        <button className={styles.addListButton}>+ Adicionar lista</button>
      </div>
    </div>
  )
}
