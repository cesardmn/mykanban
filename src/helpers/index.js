export const fBoard = () => {
  const all = () => {
    return JSON.parse(localStorage.getItem('mk_boards')) || null
  }
  const addBoard = (board) => {
    const boards = all()

    if (boards) {
      const newBoards = [board, ...boards]
      newBoards.sort((a, b) => a.name.localeCompare(b.name))
      localStorage.setItem('mk_boards', JSON.stringify(newBoards))
    } else {
      localStorage.setItem('mk_boards', JSON.stringify([board]))
    }
  }

  const deleteBoard = (boardId) => {
    let boards = all()
    if (boards) {
      boards = boards.filter((board) => board.id !== boardId)
      localStorage.setItem('mk_boards', JSON.stringify(boards))
    }
  }

  const boardNameUpdate = (boardId, newName) => {
    const boards = all()
    const updatedBoards = boards.map((board) => {
      if (board.id === boardId) {
        return { ...board, name: newName }
      }
      return board
    })
    localStorage.setItem('mk_boards', JSON.stringify(updatedBoards))
  }

  const addList = (boardId, list) => {
    const boards = all()
    const updatedBoards = boards.map((board) => {
      if (board.id === boardId) {
        const updatedLists = [...board.lists, list]
        updatedLists.sort((a, b) => a.createdAt - b.createdAt) // Sort in descending order
        return { ...board, lists: updatedLists }
      }
      return board
    })
    localStorage.setItem('mk_boards', JSON.stringify(updatedBoards))
  }

  const deleteList = (listId) => {
    const boards = all()
    const updatedBoards = boards.map((board) => {
      const updatedLists = board.lists.filter((list) => list.id !== listId)
      return { ...board, lists: updatedLists }
    })
    localStorage.setItem('mk_boards', JSON.stringify(updatedBoards))
  }

  const listNameUpdate = (listId, newName) => {
    const boards = all()
    const updatedBoards = boards.map((board) => {
      const updatedLists = board.lists.map((list) => {
        if (list.id === listId) {
          return { ...list, name: newName }
        }
        return list
      })
      return { ...board, lists: updatedLists }
    })
    localStorage.setItem('mk_boards', JSON.stringify(updatedBoards))
  }

  const addCard = (listId, card) => {
    const boards = all()
    const updatedBoards = boards.map((board) => {
      const updatedLists = board.lists.map((list) => {
        if (list.id === listId) {
          const updatedCards = [...list.cards, card]
          return { ...list, cards: updatedCards }
        }
        return list
      })
      return { ...board, lists: updatedLists }
    })
    localStorage.setItem('mk_boards', JSON.stringify(updatedBoards))
  }

  const deleteCard = (cardId) => {
    const boards = all()
    const updatedBoards = boards.map((board) => {
      const updatedLists = board.lists.map((list) => {
        const updatedCards = list.cards.filter((card) => card.id !== cardId)
        return { ...list, cards: updatedCards }
      })
      return { ...board, lists: updatedLists }
    })
    localStorage.setItem('mk_boards', JSON.stringify(updatedBoards))
  }

  const cardNameUpdate = (cardId, newName) => {
    const boards = all()
    const updatedBoards = boards.map((board) => {
      const updatedLists = board.lists.map((list) => {
        const updatedCards = list.cards.map((card) => {
          if (card.id === cardId) {
            return { ...card, name: newName }
          }
          return card
        })
        return { ...list, cards: updatedCards }
      })
      return { ...board, lists: updatedLists }
    })
    localStorage.setItem('mk_boards', JSON.stringify(updatedBoards))
  }

  const cardContentUpdate = (cardId, newContent) => {
    const boards = all()
    const updatedBoards = boards.map((board) => {
      const updatedLists = board.lists.map((list) => {
        const updatedCards = list.cards.map((card) => {
          if (card.id === cardId) {
            return { ...card, content: newContent }
          }
          return card
        })
        return { ...list, cards: updatedCards }
      })
      return { ...board, lists: updatedLists }
    })
    localStorage.setItem('mk_boards', JSON.stringify(updatedBoards))
  }

  //
  const getBoardById = (id) => {
    const boards = all()
    return boards.find((board) => board.id === id) || null
  }

  const getListById = (listId) => {
    const boards = all()
    const lists = boards.flatMap((board) => board.lists)
    return lists.find((list) => list.id === listId) || null
  }

  const getCardById = (cardId) => {
    const boards = all()
    const cards = boards.flatMap((board) =>
      board.lists.flatMap((list) => list.cards)
    )
    return cards.find((card) => card.id === cardId) || null
  }

  return {
    all,
    addBoard,
    deleteBoard,
    boardNameUpdate,
    getBoardById,
    addList,
    deleteList,
    listNameUpdate,
    addCard,
    deleteCard,
    cardNameUpdate,
    cardContentUpdate,
    getListById,
    getCardById,
  }
}
