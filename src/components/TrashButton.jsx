import styles from '@styles/TrashButton.module.css'
import {TbTrashX} from 'react-icons/tb'


export default function TrashButton() {
  return (
    <button className={styles.button} ><TbTrashX /></button>
  )
}
