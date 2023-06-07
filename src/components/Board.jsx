// styles
import styles from '@styles/Board.module.css'
import ListContent from './ListContent'

const list = [
  {
    listName: 'Backlog',
    listCard: [
      {
        cardTitle: 'Reunião 1 a 1',
        cardDescription:
          'Realizar a reunião semanal 1 a 1 com alguém fora do time.',
      },
      {
        cardTitle: 'Atualizar currículo',
        cardDescription: 'verificar ospontos a serematuaizados no currículo',
      },
      {
        cardTitle: 'Agenda 90 dias',
        cardDescription: 'Criar a agenda dos 90 dias usando o template.',
      },
    ],
  },
  {
    listName: 'Em execução',
    listCard: [
      {
        cardTitle: 'projeto da semana ',
        cardDescription: 'Todo List Kanban - iniciando com NextJs',
      },
      {
        cardTitle: 'Post no Linkedin',
        cardDescription: 'Realizaro post após deploy do projeto.',
      },
    ],
  },
  {
    listName: 'Realizado',
    listCard: [
      {
        cardTitle: 'projeto da semana ',
        cardDescription:
          'Devflix, projeto de página para salvar links do YouTube.',
      },
    ],
  },
]

export default function Board() {
  return (
    <div className={styles.board}>
      {list.map((content) => {
        return (
          <div className={styles.listWrapper} key={content.listName}>
            <ListContent content={content} />
          </div>
        )
      })}

      <div className={styles.listWrapper}>
        <button className={styles.addListButton}>
          {list.length > 0 ? '+ Adicionar outra lista' : '+ Adicionar lista'}
        </button>
      </div>
    </div>
  )
}
