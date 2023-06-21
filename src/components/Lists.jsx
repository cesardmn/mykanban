// providers
import { useBoards } from '@providers/BoardsProvider'

// libs
import { fBoard } from '../helpers'
import { v4 as uuidv4 } from 'uuid'

//styles
import styles from '@styles/Lists.module.css'

import ActionButton from './ActionButton'
import List from './List'

export default function Lists({ boardViewSelected }) {
  const localBoards = fBoard()
  const { setBoards } = useBoards()
  const boardView = localBoards.getBoardById(boardViewSelected.id)

  const handleNewList = (name) => {
    const list = {
      id: uuidv4(),
      name,
      cards: [],
      board: boardViewSelected.id,
      createdAt: Date.now(),
      type: 'list',
    }
    localBoards.addList(boardViewSelected.id, list)
    setBoards(localBoards.all())
  }
  return (
    <ul className={styles.listsWrapper}>
      {boardView.lists.map((list) => {
        return (
          <List key={list.id} list={list}>
            {list.name}
          </List>
        )
      })}
      <li className={styles.addListButtonWrapper}>
        <ActionButton action={handleNewList}>+ add list </ActionButton>
      </li>
    </ul>
  )
}
