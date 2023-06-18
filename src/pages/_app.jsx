import '@styles/globals.css'
import { BoardsProvider } from '@providers/BoardsProvider'
import { BoardViewProvider } from '@providers/BoardViewProvider'

export default function App({ Component, pageProps }) {
  return (
    <BoardsProvider>
      <BoardViewProvider>
        <Component {...pageProps} />
      </BoardViewProvider>
    </BoardsProvider>
  )
}
