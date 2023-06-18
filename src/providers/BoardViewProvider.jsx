import { createContext, useContext, useState } from 'react'

export const BoardViewContext = createContext({})

export const BoardViewProvider = (props) => {
  const [boardView, setBoardView] = useState(null)

  return (
    <BoardViewContext.Provider
      value={{
        boardView,
        setBoardView,
      }}
    >
      {props.children}
    </BoardViewContext.Provider>
  )
}

export const useBoardView = () => useContext(BoardViewContext)
