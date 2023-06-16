import Board from '@components/Board'
import ActionButton from '@src/components/ActionButton'
import AddListButton from '@src/components/AddListButton'
import Logo from '@src/components/Logo'
import Head from 'next/head'
import { useEffect, useState } from 'react'

export default function Home() {
  const [boards, setBoards] = useState(null)
  const [menuIsOpen, setMenuIsOpen] = useState(false)

  const handleMenu = () => {
    setMenuIsOpen(!menuIsOpen)
  }

  useEffect(() => {
    setBoards(JSON.parse(localStorage.getItem('MyKanban')) || null)
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
            <li>Board 1</li>
            <li>Board 2</li>
            <li>Board 3</li>
            <li>Board 4</li>
          </ul>

          <div className="boardActions">
            <ActionButton>new</ActionButton>
            <ActionButton>import</ActionButton>
            <ActionButton>export</ActionButton>
          </div>
        </div>

        <div className="boardContent">
          {boards ? <Board /> : <div>preview</div>}
        </div>
      </main>
    </>
  )
}
