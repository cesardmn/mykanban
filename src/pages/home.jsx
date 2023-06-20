// react
import { useEffect } from 'react'

// providers
import { useBoards } from '@providers/BoardsProvider'

//libs and helpers
import { fBoard } from '../helpers/index'

export default function Home() {
  const { boards, setBoards } = useBoards()
  const localBoards = fBoard()

  useEffect(() => {
    setBoards(localBoards.all())
  }, [])
  return (
    <main>
      <aside>
        <ul>
          {boards &&
            boards.map((board) => {
              return <li key={board.key}> {board.name} </li>
            })}
        </ul>
      </aside>
      <section></section>
    </main>
  )
}
