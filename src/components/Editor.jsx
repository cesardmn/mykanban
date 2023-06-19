import { useEffect, useRef } from 'react'
import 'quill/dist/quill.snow.css'
import { useQuill } from 'react-quilljs'

import styles from '@styles/Editor.module.css'
import { fBoard } from '@src/helpers'

export default function Editor({ closeEditor, card, listView }) {
  const { quill, quillRef } = useQuill()
  const editorElementRef = useRef(null)

  const localBoards = fBoard()

  useEffect(() => {
    if (quill) {
      quill.on('text-change', (delta, oldDelta, source) => {
        const text = quill.root.innerHTML
        const updatedContent = {
          pure: editorElementRef.current.textContent,
          formatted: text,
        }
        localBoards.cardContentUpdate(card.id, updatedContent)
      })

      quill.focus()

      editorElementRef.current = quillRef.current.firstChild
    }
  }, [quill, card, localBoards])

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

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h4>{card.name}</h4>
        </div>
        <div className={styles.editor}>
          <div
            ref={quillRef}
            dangerouslySetInnerHTML={{
              __html:
                listView.cards.find((c) => c.id === card.id)?.content
                  .formatted || '',
            }}
          />
        </div>
      </div>
    </div>
  )
}
