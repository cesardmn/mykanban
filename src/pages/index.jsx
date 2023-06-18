// react
import { useEffect, useState } from 'react'

// next
import Head from 'next/head'

//components
import Board from '@src/components/Board'
import Button from '@src/components/Button'
import Logo from '@src/components/Logo'
import AddListButton from '@src/components/ActionButton'

// libs
import { v4 as uuidv4 } from 'uuid'
import { fBoard } from '../helpers'

// providers
import { useBoards } from '@providers/BoardsProvider'
import { useBoardView } from '@providers/BoardViewProvider'

export default function Home() {
  const localBoards = fBoard()
  const { boards, setBoards } = useBoards()
  const { boardView, setBoardView } = useBoardView()

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

  const handleBoardView = (board) => {
    setBoardView(board)
  }

  const handleDeleteBoard = (board) => {
    localBoards.deleteBoard(board.id)
    setBoards(localBoards.all())
    setBoardView(null)
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
                return (
                  <li
                    key={board.id}
                    onClick={() => {
                      handleBoardView(board)
                    }}
                  >
                    {board.name}{' '}
                  </li>
                )
              })}
          </ul>

          <div className="boardActions">
            <AddListButton action={handleNewBoard}>New</AddListButton>
            <Button>import</Button>
            {boards && <Button>export</Button>}
          </div>
        </div>

        <div className="content">
          {boardView ? (
            <div className="boardDisplay">
              <header>
                <span>{boardView.name}</span>
                <span
                  onClick={() => {
                    handleDeleteBoard(boardView)
                  }}
                >
                  del board
                </span>
              </header>
              <Board />
            </div>
          ) : (
            <span>preview</span>
          )}
        </div>
      </main>
    </>
  )
}
