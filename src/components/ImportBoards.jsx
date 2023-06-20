import React, { useRef } from 'react'
import Button from '@src/components/Button'
import { fBoard } from '../helpers/index'

export default function ImportBoards() {
  const localBoards = fBoard()
  const fileInputRef = useRef(null)

  const handleButtonClick = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    const reader = new FileReader()

    reader.onload = () => {
      try {
        const content = JSON.parse(reader.result)
        if (Array.isArray(content)) {
          const isDataValid = content.every((item) => isItemValid(item))
          if (isDataValid) {
            console.log('Conteúdo do arquivo:', content)
            content.forEach((board) => localBoards.addBoard(board))
          } else {
            console.error('O arquivo JSON contém estruturas inválidas.')
          }
        } else {
          console.error('O arquivo JSON deve ser um array de objetos.')
        }
      } catch (error) {
        console.error('Erro ao ler o arquivo JSON:', error)
      }
    }

    reader.readAsText(file)
  }

  const isItemValid = (item) => {
    return (
      typeof item === 'object' &&
      'id' in item &&
      'name' in item &&
      Array.isArray(item.lists) &&
      typeof item.createdAt === 'number' &&
      item.lists.every((list) => isListValid(list))
    )
  }

  const isListValid = (list) => {
    return (
      typeof list === 'object' &&
      'id' in list &&
      'name' in list &&
      Array.isArray(list.cards) &&
      typeof list.board === 'string' &&
      typeof list.createdAt === 'number' &&
      list.cards.every((card) => isCardValid(card))
    )
  }

  const isCardValid = (card) => {
    return (
      typeof card === 'object' &&
      'id' in card &&
      'name' in card &&
      typeof card.content === 'object' &&
      'pure' in card.content &&
      'formatted' in card.content &&
      typeof card.list === 'string' &&
      typeof card.createdAt === 'number'
    )
  }

  return (
    <div>
      <div onClick={handleButtonClick}>
        <Button>Import</Button>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>
  )
}
