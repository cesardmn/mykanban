import styles from '@styles/Logo.module.css'

export default function Logo() {
  return (
    <h1 title="MyKanban" className={styles.logo}>
      <span className={styles.postItGreen}>my</span>
      <div className={styles.botton}>
        <span className={styles.postItYelow}>kan</span>
        <span className={styles.postItPink}>ban</span>
      </div>
    </h1>
  )
}
