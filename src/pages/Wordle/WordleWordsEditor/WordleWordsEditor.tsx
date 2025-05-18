import { useParams } from 'react-router'
import {
  TableColumn,
  TableEdit,
} from '../../../components/Table/TableEdit/TableEdit'
import Input from '../../../components/UI/Input/Input'
import { useEffect, useState } from 'react'
import { WordleWord } from '../../../models/wordleWord'
import { wordle } from '../../../services/api/gamesModule/games/wordle'
import { Loading } from '../../../components/Loading/Loading'

export const WordleWordsEditor = () => {
  const { id: departmentId } = useParams<{ id: string }>()
  const [words, setWords] = useState<WordleWord[]>([])
  const [newWord, setNewWord] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)

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

    setIsLoading(false)
  }, [departmentId])

  const columns: TableColumn<WordleWord>[] = [
    {
      key: 'word',
      title: 'Слово',
      render: (row, onChange, isDisabled) => (
        <Input
          value={row.word}
          onChange={e => onChange(e.target.value)}
          disabled={isDisabled}
          placeholder="Слово"
        />
      ),
    },
  ]

  const addRowTemplate = {
    word: '',
  }

  const handleCreateWord = async () => {
    if (!newWord.trim() || !departmentId) return
    setIsLoading(true)
    try {
      const addedWord = await wordle.createWord(newWord.trim(), +departmentId)

      setWords(prev => [...prev, addedWord])
      setNewWord('')
    } catch (e) {
      console.log(`[Wordle] ${e}`)
    }
  }

  return !isLoading ? (
    <div style={{ padding: 20 }}>
      <TableEdit<WordleWord>
        title="Редактирование игры «5 букв»"
        columns={columns}
        initialRows={words}
        addRowTemplate={addRowTemplate}
        onAddRow={handleCreateWord}
      />

      <Input
        value={newWord}
        onChange={e => setNewWord(e.target.value)}
        placeholder="Слово"
      />
      <button onClick={handleCreateWord}>Добавить слово</button>
    </div>
  ) : (
    <Loading />
  )
}
