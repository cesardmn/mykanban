import { createContext, useContext, useState } from 'react'

export const CardContext = createContext({})

export const CardProvider = (props) => {
  const [card, setCard] = useState(null)

  return (
    <CardContext.Provider
      value={{
        card,
        setCard,
      }}
    >
      {props.children}
    </CardContext.Provider>
  )
}

export const useCard = () => useContext(CardContext)
