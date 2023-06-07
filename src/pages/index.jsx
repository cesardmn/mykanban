import Board from '@/components/Board'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>My Kanban</title>
        <meta name="description" content="Organize your projects into board." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Board />
      </main>
    </>
  )
}
