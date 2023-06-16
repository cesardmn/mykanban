import { useEffect } from 'react'

import Button from '@src/components/Button'
import Logo from '@src/components/Logo'
import Head from 'next/head'

import { v4 as uuidv4 } from 'uuid'
import AddListButton from '@src/components/ActionButton'

import { fBoard } from '../helpers'

// providers
import { useBoards } from '@providers/BoardsProvider'

export default function Home() {
  const localBoards = fBoard()
  const { boards, setBoards } = useBoards()

  const handleNewBoard = (name) => {
    const board = {
      id: uuidv4(),
      name,
      lists: [],
      createdAt: Date.now(),
    }

    localBoards.addBoard(board)
    setBoards(localBoards.all())
  }

  useEffect(() => {
    setBoards(localBoards.all())
  }, [])

  return (
    <>
      <Head>
        <title>My Kanban</title>
        <meta name="description" content="Organize your projects into board." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="menu">
          <div className="logo">
            <Logo />
          </div>

          <h2>Boards</h2>
          <ul className="boardLIst noScrollBar">
            {boards &&
              boards.map((board) => {
                return <li key={board.id}>{board.name} </li>
              })}
          </ul>

          <div className="boardActions">
            <AddListButton action={handleNewBoard}>New</AddListButton>
            <Button>import</Button>
            <Button>export</Button>
          </div>
        </div>

        <div className="boardContent">
          <div>preview</div>
        </div>
      </main>
    </>
  )
}
