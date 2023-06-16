import Board from '@components/Board'
import Head from 'next/head'
import { useEffect, useState } from 'react'

export default function Home() {
  const [boards, setBoards] = useState(null)

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
        <div className="boardList">
          <h1>My Kanabn</h1>
          <button>New Board</button>
          <h2>Boards</h2>

          {boards ? (
            <div>Export Boards</div>
          ) : (
            <form action="">
              <label htmlFor="boards">
                <button>Impor tBoards</button>
              </label>
              <input type="file" name="boards" id="boards" hidden />
            </form>
          )}
        </div>

        <div className="boardContent">
          {
            boards ?
            <Board/> :
            <div>preview</div>
          }
        </div>
      </main>
    </>
  )
}
