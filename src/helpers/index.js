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

  const getBoardById = (id) => {
    const boards = all()

    if (boards) {
      return boards.filter((board) => board.id === id)[0]
    } else {
      return null
    }
  }

  const addList = (boardUp, list) => {
    const boards = all()
    const without = boards.filter((board) => board.id !== boardUp.id)

    boardUp.lists = [list, ...boardUp.lists]
    localStorage.setItem('mk_boards', JSON.stringify([boardUp, ...without]))
  }

  return { all, addBoard, getBoardById, addList }
}
