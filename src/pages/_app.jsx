import '@styles/globals.css'
import { BoardsProvider } from '@providers/BoardsProvider'
import { BoardViewProvider } from '@providers/BoardViewProvider'
import { CardProvider } from '@providers/CardProvider'

export default function App({ Component, pageProps }) {
  return (
    <BoardsProvider>
      <BoardViewProvider>
        <CardProvider>
          <Component {...pageProps} />
        </CardProvider>
      </BoardViewProvider>
    </BoardsProvider>
  )
}
