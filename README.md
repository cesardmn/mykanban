## entidades:

- board:
  id: uuid
  name: string
  lists: array
createdAt: Date.now()

- list:
  id: uuid
  name: string
  cards: array
  board: uuid[board]
  createdAt: Date.now()

- card:
  id: uuid
  nome: string
  content: string
  list: uuid[list]
  createdAt: Date.now()

- localstorage
  lista de cards
