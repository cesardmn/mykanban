// react
import { useEffect, useState } from 'react'

// styles
import styles from '@styles/Board.module.css'
import ListContent from './ListContent'

export default function Board() {
  const [lists, setLists] = useState([])

  useEffect(() => {
    fetch('/api/db')
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setLists([...new Set(data.map((card) => card.listName))])
      })
  }, [])

  return (
    <div className={styles.board}>
      {lists.map((list) => {
        return (
          // <div className={styles.listWrapper} key={list.listName}>
          //   <ListContent content={content} />
          // </div>
          <></>
        )
      })}

      <div className={styles.listWrapper}>
        <button className={styles.addListButton}>
          {/* {list.length > 0 ? '+ Adicionar outra lista' : '+ Adicionar lista'} */}
        </button>
      </div>
    </div>
  )
}
