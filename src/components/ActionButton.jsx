//react
import { useState, useEffect, useRef } from 'react'

//styles
import styles from '@styles/ActionButton.module.css'

export default function ActionButton({ children, action }) {
  const [form, setForm] = useState(false)
  const inputRef = useRef(null)
  const addButtonRef = useRef(null)

  useEffect(() => {
    if (form) {
      inputRef.current.focus()
    }
  }, [form])

  const handleForm = () => {
    setForm(true)
  }

  const handleCloseForm = (e) => {
    if (e.relatedTarget !== addButtonRef.current) {
      setForm(false)
    }
  }

  const handleAction = (e) => {
    e.preventDefault()

    // call add new list function
    action(inputRef.current.value)

    handleCloseForm(e)
  }

  return (
    <div className={styles.buttonWrapper} onClick={handleForm}>
      {form ? (
        <form onSubmit={handleAction}>
          <input type="text" ref={inputRef} onBlur={handleCloseForm} required />
          <fieldset>
            <button ref={addButtonRef} type="submit" className={styles.aButton}>
              + add
            </button>
            <button
              type="button"
              onClick={handleCloseForm}
              className={styles.aButton}
            >
              x
            </button>
          </fieldset>
        </form>
      ) : (
        <button ref={addButtonRef}>{children}</button>
      )}
    </div>
  )
}
