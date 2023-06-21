// react and next
import { useEffect, useState } from 'react'
import Head from 'next/head'

// components
import Board from '@components/Board'
import Button from '@components/Button'
import Logo from '@components/Logo'
import ImportBoards from '@components/ImportBoards'
import ActionButton from '@components/ActionButton'
import TrashButton from '@src/components/TrashButton'

// providers
import { useBoards } from '@providers/BoardsProvider'

// lib and helpers
import { v4 as uuidv4 } from 'uuid'
import { fBoard } from '../helpers'

export default function Home() {
  const localBoards = fBoard()
  const { boards, setBoards } = useBoards()

  const [onEditBoardName, setOnEditBoardName] = useState(false)
  const [editedBoardName, setEditedBoardName] = useState('')

  const [boardView, setBoardView] = useState()
  const [selectedBoard, setSelectedBoard] = useState(false)

  const handlePreview = () => {
    setBoardView(null)
  }

  useEffect(() => {
    const saveBoards = localBoards.all()
    setBoards(saveBoards)
  }, [])

  const handleNewBoard = (name) => {
    const board = {
      id: uuidv4(),
      name,
      lists: [],
      createdAt: Date.now(),
      type: 'board',
    }

    localBoards.addBoard(board)
    setBoards(localBoards.all())
  }

  const handleBoardView = (board) => {
    setBoardView(localBoards.getBoardById(board.id))
    setSelectedBoard(!selectedBoard)
  }

  const handleDeleteBoard = (board) => {
    localBoards.deleteBoard(board.id)
    setBoards(localBoards.all())
    setBoardView(null)
  }

  const handleSaveBoardName = () => {
    const trimName = editedBoardName.trim()

    if (trimName !== '') {
      localBoards.boardNameUpdate(boardView.id, editedBoardName)
      setOnEditBoardName(false)
      setBoardView({ ...boardView, name: editedBoardName })
      setBoards(localBoards.all())
    }
  }

  const handleExportBoards = () => {
    localBoards.exportBoards()
  }

  return (
    <>
      <Head>
        <title>MyKanBan</title>
        <meta name="description" content="Organize your projects into board." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="menu">
          <div className="logo" onClick={handlePreview}>
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
                    className={`boardListItem`}
                  >
                    {board.name}
                  </li>
                )
              })}
          </ul>

          <div className="boardActions">
            <ActionButton action={handleNewBoard}>New</ActionButton>

            <ImportBoards />

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
              <div className="header">
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
                    autoFocus
                    className="inputBoardName"
                  />
                ) : (
                  <span
                    onClick={() => {
                      setOnEditBoardName(true)
                      setEditedBoardName(boardView.name)
                    }}
                    className="boardTitle"
                  >
                    {boardView.name}
                  </span>
                )}

                <span
                  onClick={() => {
                    handleDeleteBoard(boardView)
                  }}
                >
                  <TrashButton />
                </span>
              </div>
              <Board boardViewSelected={boardView} />
            </div>
          ) : (
            <div className="preview">
              <h1>MyKanBan</h1>
              <p>Organize your projects into board.</p>
              <img src="/preview.gif" alt="" />
            </div>
          )}
        </div>
      </main>
    </>
  )
}
