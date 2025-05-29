import { useParams } from 'react-router'
import {
  TableColumn,
  TableEdit,
} from '../../../components/Table/TableEdit/TableEdit'
import Input from '../../../components/UI/Input/Input'
import { useCallback, useEffect, useState } from 'react'
import { WordleWord } from '../../../models/wordleWord'
import { wordle } from '../../../services/api/gamesModule/games/wordle'
import { Loading } from '../../../components/Loading/Loading'
import { CustomAlert } from '../../../components/CustomAlert/CustomAlert'

export const WordleWordsEditor = () => {
  const { id: departmentId } = useParams<{ id: string }>()
  const [words, setWords] = useState<WordleWord[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMessage, setModalMessage] = useState('')

  useEffect(() => {
    const fetchWords = async () => {
      if (!departmentId) return

      try {
        const data = await wordle.getWords(+departmentId)
        setWords(data)
      } catch (e) {
        console.log(`[Wordle] ${e}`)
      }
    }

    fetchWords()
  }, [departmentId])

  const columns: TableColumn<WordleWord>[] = [
    {
      key: 'word',
      title: 'Слово',
      render: (row, onChange, isDisabled) => {
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          let value = e.target.value.toUpperCase()
          value = value.replace(/[^А-Я]/g, '')
          if (value.length > 5) {
            value = value.slice(0, 5)
          }
          onChange(value)
        }

        return (
          <Input
            value={row.word}
            onChange={handleChange}
            disabled={isDisabled}
            placeholder="Слово"
            maxLength={5}
          />
        )
      },
    },
  ]

  const addRowTemplate = {
    word: '',
  }

  const handleCreateWord = useCallback(
    async (newWordData: Omit<WordleWord, 'id'>) => {
      const wordToAdd = newWordData.word?.trim().toUpperCase()
      if (!wordToAdd || !departmentId) return

      const isDuplicate = words.some(w => w.word.toUpperCase() === wordToAdd)
      if (isDuplicate) {
        setModalMessage('Такое слово уже существует')
        setIsModalOpen(true)
        return
      }

      try {
        const addedWord = await wordle.createWord(wordToAdd, +departmentId)
        setWords(prev => [...prev, addedWord])
      } catch (e) {
        console.log(`[Wordle] ${e}`)
      }
    },
    [departmentId, words],
  )

  return (
    <div style={{ padding: 20 }}>
      <TableEdit<WordleWord>
        title="Редактирование игры «5 букв»"
        columns={columns}
        initialRows={words}
        addRowTemplate={addRowTemplate}
        onAddRow={handleCreateWord}
      />
      <CustomAlert
        title="Предупреждение"
        isOpen={isModalOpen}
        message={modalMessage}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}
