import '@styles/globals.css'
import { BoardsProvider } from '@providers/BoardsProvider'

export default function App({ Component, pageProps }) {
  return (
    <BoardsProvider>
      <Component {...pageProps} />
    </BoardsProvider>
  )
}
