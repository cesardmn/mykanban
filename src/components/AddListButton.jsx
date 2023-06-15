//react
import { useState, useEffect, useRef } from 'react'

//styles
import styles from '@styles/AddListButton.module.css'

export default function AddListButton() {
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

  const handleNewList = (e) => {
    e.preventDefault()

    // call add new list function
    console.log(inputRef.current.value)

    handleCloseForm(e)
  }

  return (
    <div className={styles.buttonWrapper} onClick={handleForm}>
      {form ? (
        <form onSubmit={handleNewList}>
          <input type="text" ref={inputRef} onBlur={handleCloseForm} />
          <fieldset>
            <button
              ref={addButtonRef}
              type="submit"
              className={styles.addButton}
            >
              + add list
            </button>
            <button
              type="button"
              onClick={handleCloseForm}
              className={styles.addButton}
            >
              x
            </button>
          </fieldset>
        </form>
      ) : (
        <button ref={addButtonRef}>+ add list</button>
      )}
    </div>
  )
}
