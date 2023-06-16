import { createContext, useContext, useState } from 'react'

export const BoardsContext = createContext({})

export const BoardsProvider = (props) => {
  const [boards, setBoards] = useState(null)

  return (
    <BoardsContext.Provider
      value={{
        boards,
        setBoards,
      }}
    >
      {props.children}
    </BoardsContext.Provider>
  )
}

export const useBoards = () => useContext(BoardsContext)
