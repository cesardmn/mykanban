export const fBoard = () => {
  const all = () => {
    return JSON.parse(localStorage.getItem('mk_boards')) || null
  }

  const addBoard = (board) => {
    const boards = all()

    if (boards) {
      const newBoards = [board, ...boards]
      localStorage.setItem('mk_boards', JSON.stringify(newBoards))
    } else {
      localStorage.setItem('mk_boards', JSON.stringify([board]))
    }
  }

  const deleteBoard = (boardUp) => {
    const boards = all()
    const without = boards.filter((board) => board.id !== boardUp.id)
    localStorage.setItem('mk_boards', JSON.stringify(without))
  }

  const addList = (boardUp, list) => {
    const boards = all()
    const without = boards.filter((board) => board.id !== boardUp.id)

    boardUp.lists = [list, ...boardUp.lists]
    localStorage.setItem('mk_boards', JSON.stringify([boardUp, ...without]))
  }

  const addCard = (card, listUp) => {
    listUp.cards = [card, ...listUp.cards]
    let boards = all()
    const boardsWithout = boards.filter((board) => board.id !== listUp.board)
    const boardUp = boards.filter((board) => board.id === listUp.board)[0]
    const listsWithout = boardUp.lists.filter((list) => list.id !== listUp.id)
    boardUp.lists = [listUp, ...listsWithout]
    boards = [boardUp, ...boardsWithout]
    localStorage.setItem('mk_boards', JSON.stringify(boards))
  }

  return { all, addBoard, deleteBoard, addList, addCard }
}
