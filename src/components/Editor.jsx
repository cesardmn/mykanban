import { useQuill } from 'react-quilljs'
import 'quill/dist/quill.snow.css'
import { useEffect, useState, useRef } from 'react'

import styles from '@styles/Editor.module.css'

export default function Editor({ closeEditor }) {
  const { quill, quillRef } = useQuill()
  const [formattedText, setFormattedText] = useState('') // Variável externa para armazenar o texto formatado
  const editorElementRef = useRef(null)

  useEffect(() => {
    if (quill) {
      quill.on('text-change', (delta, oldDelta, source) => {
        const text = quill.root.innerHTML
        setFormattedText(text) // Atualiza a variável externa com o texto formatado
      })

      if (!formattedText && quill.root.innerHTML === '') {
        quill.clipboard.dangerouslyPasteHTML(formattedText)
      }

      quill.focus() // Dá foco ao editor

      editorElementRef.current = quillRef.current.firstChild

      if (editorElementRef.current) {
        editorElementRef.current.addEventListener('blur', handleEditorBlur) // Adiciona o event listener para o evento blur
      }
    }

    return () => {
      if (editorElementRef.current) {
        editorElementRef.current.removeEventListener('blur', handleEditorBlur) // Remove o event listener ao desmontar o componente
      }
    }
  }, [quill, formattedText])

  useEffect(() => {
    if (quill && formattedText) {
      quill.clipboard.dangerouslyPasteHTML(formattedText)
    }
  }, [quill, formattedText])

  const handleEditorBlur = () => {
    closeEditor()
  }

  return (
    <div className={styles.full}>
      <h4  >Card Name</h4>
      <div className={styles.editor}>
        <div ref={quillRef} />
      </div>
    </div>
  )
}
