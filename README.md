## entidades:

- board:
  id: uuid
  name: string
  lists: array

- list:
  id: uuid
  name: string
  cards: array
  board: uuid[board]

- card:
  id: uuid
  nome: string
  content: string
  list: uuid[list]

- localstorage
  lista de cards
