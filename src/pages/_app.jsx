import '@styles/globals.css'
import { BoardsProvider } from '@providers/BoardsProvider'
import { DragCardProvider } from '@providers/DragCardProvider'

export default function App({ Component, pageProps }) {
  return (
    <BoardsProvider>
      <DragCardProvider>
        <Component {...pageProps} />
      </DragCardProvider>
    </BoardsProvider>
  )
}
