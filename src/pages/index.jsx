import { useEffect, useState } from 'react'
import Head from 'next/head'
import Board from '@src/components/Board'
import Button from '@src/components/Button'
import Logo from '@src/components/Logo'
import AddListButton from '@src/components/ActionButton'
import { v4 as uuidv4 } from 'uuid'
import { fBoard } from '../helpers'
import { useBoards } from '@providers/BoardsProvider'
import { useBoardView } from '@providers/BoardViewProvider'

export default function Home() {
  const localBoards = fBoard()
  const { boards, setBoards } = useBoards()
  const { boardView, setBoardView } = useBoardView()

  const [onEditBoardName, setOnEditBoardName] = useState(false)
  const [editedBoardName, setEditedBoardName] = useState('')

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

  const handleSaveBoardName = () => {
    localBoards.boardNameUpdate(boardView.id, editedBoardName)
    setOnEditBoardName(false)
    setBoardView({ ...boardView, name: editedBoardName })
    setBoards(localBoards.all())
  }

  useEffect(() => {
    setBoards(localBoards.all())
  }, [])

  const handleExportBoards = () => {
    const boards = localBoards.all()
    const json = JSON.stringify(boards, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)

    const currentDate = new Date()
    const formattedDate = currentDate
      .toLocaleString('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replace(/\//g, '')

    const fileName = `${formattedDate}_mykanban_boards.json`

    const link = document.createElement('a')
    link.href = url
    link.download = fileName
    link.click()

    URL.revokeObjectURL(url)
  }

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
          <ul className="boardList noScrollBar">
            {boards &&
              boards.map((board) => {
                return (
                  <li
                    key={board.id}
                    onClick={() => {
                      handleBoardView(board)
                    }}
                  >
                    {board.name}
                  </li>
                )
              })}
          </ul>

          <div className="boardActions">
            <AddListButton action={handleNewBoard}>New</AddListButton>
            <Button>import</Button>
            {boards && (
              <div onClick={handleExportBoards}>
                <Button>export</Button>
              </div>
            )}
          </div>
        </div>

        <div className="content">
          {boardView ? (
            <div className="boardDisplay">
              <header>
                {onEditBoardName ? (
                  <input
                    type="text"
                    placeholder={boardView.name}
                    value={editedBoardName}
                    onChange={(e) => setEditedBoardName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSaveBoardName()
                      }
                    }}
                    onBlur={handleSaveBoardName}
                    autoFocus // Adiciona o atributo autoFocus para fornecer o foco inicial
                  />
                ) : (
                  <span
                    onClick={() => {
                      setOnEditBoardName(true)
                      setEditedBoardName(boardView.name)
                    }}
                  >
                    {boardView.name}
                  </span>
                )}
                <span
                  onClick={() => {
                    handleDeleteBoard(boardView)
                  }}
                >
                  del board
                </span>
              </header>
              <Board boardViewSelected={boardView} />
            </div>
          ) : (
            <span>preview</span>
          )}
        </div>
      </main>
    </>
  )
}
