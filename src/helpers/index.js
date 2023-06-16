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

  return { all, addBoard }
}
