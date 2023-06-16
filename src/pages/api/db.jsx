const db = [
  {
    listName: 'Backlog',
    cardTitle: 'Reunião 1 a 1',
    cardDescription:
      'Realizar a reunião semanal 1 a 1 com alguém fora do time.',
  },
  {
    listName: 'Backlog',
    cardTitle: 'Atualizar currículo',
    cardDescription: 'verificar ospontos a serematuaizados no currículo',
  },
  {
    listName: 'Backlog',
    cardTitle: 'Agenda 90 dias',
    cardDescription: 'Criar a agenda dos 90 dias usando o template.',
  },
  {
    listName: 'Em execução',
    cardTitle: 'projeto da semana ',
    cardDescription: 'Todo List Kanban - iniciando com NextJs',
  },
  {
    listName: 'Em execução',
    cardTitle: 'Post no Linkedin',
    cardDescription: 'Realizaro post após deploy do projeto.',
  },
  {
    listName: 'Realizado',
    cardTitle: 'projeto da semana ',
    cardDescription: 'Devflix, projeto de página para salvar links do YouTube.',
  },
]

export default function handler(req, res) {
  res.status(200).json(db)
}
