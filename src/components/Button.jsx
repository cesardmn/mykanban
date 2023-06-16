import styles from '@styles/Button.module.css'

export default function ActionButton({ children }) {
  return <button className={styles.actionButton}> {children}</button>
}
