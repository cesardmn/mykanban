import { createContext, useContext, useState } from 'react'

export const DragCardContext = createContext({})

export const DragCardProvider = (props) => {
  const [dragCard, setDragCard] = useState([])

  return (
    <DragCardContext.Provider
      value={{
        dragCard,
        setDragCard,
      }}
    >
      {props.children}
    </DragCardContext.Provider>
  )
}

export const useDragCard = () => useContext(DragCardContext)
