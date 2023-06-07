import React from 'react'

import styles from '@styles/ListContent.module.css'

export default function ListContent() {
  return (
    <div className={styles.listContent}>
      <div className={styles.listHeader}>
        <input type="text" />
      </div>
      <div className={styles.listCards}>listCards</div>
      <div className={styles.listCards}>listCards</div>
      <div className={styles.listCards}>listCards</div>
      <div className={styles.cardCompose}>+ Adicionar um cartão</div>
    </div>
  )
}
