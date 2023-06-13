import React from 'react'

import styles from '@styles/ListContent.module.css'

export default function ListContent({ content }) {

  

  return (
    <div className={styles.listContent}>
      <div className={styles.listHeader}>
        <input type="text" placeholder={content.listName} />
      </div>
      {content.listCard.map((card) => {
        return (
          <div className={styles.listCards} key={card.cardTitle   } >
            <h3>{card.cardTitle}</h3>
            <p>{card.cardDescription}</p>
          </div>
        )
      })}

      <div className={styles.cardCompose}>+ Adicionar um cartão</div>
    </div>
  )
}
