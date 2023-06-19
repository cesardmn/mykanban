import { useEffect, useRef } from 'react'
import 'quill/dist/quill.snow.css'
import { useQuill } from 'react-quilljs'
import styles from '@styles/Editor.module.css'
import { fBoard } from '@src/helpers'

export default function Editor({
  closeEditor,
  card,
  listView,
  listViewUpdate,
}) {
  const { quill, quillRef } = useQuill()
  const editorElementRef = useRef(null)
  const localBoards = fBoard()

  useEffect(() => {
    if (quill) {
      const handleTextChange = (delta, oldDelta, source) => {
        const text = quill.root.innerHTML
        const updatedContent = {
          pure: editorElementRef.current.textContent,
          formatted: text,
        }
        localBoards.cardContentUpdate(card.id, updatedContent)

        // Atualiza o conteúdo do card no listView
        const updatedCards = listView.cards.map((c) => {
          if (c.id === card.id) {
            return {
              ...c,
              content: updatedContent,
            }
          }
          return c
        })
        const updatedListView = {
          ...listView,
          cards: updatedCards,
        }
        listViewUpdate(updatedListView)
      }

      quill.on('text-change', handleTextChange)
      quill.focus()
      editorElementRef.current = quillRef.current.firstChild

      return () => {
        quill.off('text-change', handleTextChange)
      }
    }
  }, [quill, card, localBoards, listView, listViewUpdate])

  useEffect(() => {
    const handleEscapeKeyPress = (event) => {
      if (event.key === 'Escape') {
        closeEditor()
      }
    }

    const handleBackdropClick = (event) => {
      if (event.target.classList.contains(styles.modalBackdrop)) {
        closeEditor()
      }
    }

    document.addEventListener('keydown', handleEscapeKeyPress)
    document.addEventListener('click', handleBackdropClick)

    return () => {
      document.removeEventListener('keydown', handleEscapeKeyPress)
      document.removeEventListener('click', handleBackdropClick)
    }
  }, [closeEditor])

  const formattedContent = card.content.formatted || ''

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h4>{card.name}</h4>
        </div>
        <div className={styles.editor}>
          <div
            ref={quillRef}
            dangerouslySetInnerHTML={{ __html: formattedContent }}
          />
        </div>
      </div>
    </div>
  )
}
