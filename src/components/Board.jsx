// styles
import styles from '@styles/Board.module.css'
import ListContent from './ListContent'

const list = []

export default function Board() {
  return (
    <div className={styles.board}>
      <div className={styles.listWrapper}>
        <ListContent />
      </div>

      <div className={styles.listWrapper}>
        <button className={styles.addListButton}>
          {list.length > 0 ? '+ Adicionar outra lista' : '+ Adicionar lista'}
        </button>
      </div>
    </div>
  )
}
