import styles from '@styles/ActionButton.module.css'

  export default function ActionButton({ children }) {
    return <button className={styles.actionButton}> {children}</button>
  }
