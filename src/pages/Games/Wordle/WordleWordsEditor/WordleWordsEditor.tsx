import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router'
import { CustomAlert } from '../../../../components/CustomAlert/CustomAlert'
import {
  TableColumn,
  TableEdit,
} from '../../../../components/Table/TableEdit/TableEdit'
import { wordle } from '../../../../services/api/gamesModule/games/wordle'
import { WordleWord } from '../../../../models/wordleWord'
import { Loading } from '../../../../components/Loading/Loading'
import Input from '../../../../components/UI/Input/Input'

export const WordleWordsEditor = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { id: departmentId } = useParams<{ id: string }>()
  const [words, setWords] = useState<WordleWord[]>([])
  const [selectedIds, setSelectedIds] = useState<number[]>([])

  const columns: TableColumn<WordleWord>[] = [
    {
      key: 'word',
      title: 'Слово',
      cellRender: (row, onChange, isDisabled) => {
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
          />
        )
      },
    },
  ]

  const addRowTemplate = {
    word: '',
  }

  useEffect(() => {
    setIsLoading(true)
    fetchWords()
    setIsLoading(false)
  }, [departmentId])

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

  const handleDeleteWord = useCallback(
    async (id: number) => {
      if (!departmentId) return

      try {
        await wordle.deleteWord(id)
        setWords(prev => prev.filter(word => word.id !== id))
      } catch (e) {
        console.error(`[Wordle] Ошибка удаления слова: ${e}`)
        setModalMessage('Ошибка при удалении слова')
        setIsModalOpen(true)
      }
    },
    [departmentId],
  )

  const handleDeleteSelectedWords = useCallback(async () => {
    if (!departmentId || selectedIds.length === 0) return

    try {
      // Параллельно удаляем все выбранные слова на сервере
      await Promise.all(selectedIds.map(id => wordle.deleteWord(id)))

      // Обновляем локальный стейт, удаляя удалённые слова
      setWords(prev => prev.filter(word => !selectedIds.includes(word.id)))

      // Очищаем выбранные ID
      setSelectedIds([])
    } catch (e) {
      console.error('[Wordle] Ошибка при удалении слов:', e)
      setModalMessage('Ошибка при удалении слов')
      setIsModalOpen(true)
    }
  }, [departmentId, selectedIds])

  const fetchWords = async () => {
    if (!departmentId) return

    try {
      const data = await wordle.getWords(+departmentId)
      setWords(data)
    } catch (e) {
      console.log(`[Wordle] ${e}`)
    }
  }

  const saveWords = async () => {
    setIsLoading(true)
    await Promise.all(words.map(word => wordle.updateWord(word.id, word.word)))
    fetchWords()
    setIsLoading(false)
  }

  return (
    <>
      {!isLoading ? (
        <div style={{ padding: 20 }}>
          <TableEdit<WordleWord>
            title="Редактирование игры «5 букв»"
            columns={columns}
            initialRows={words}
            addRowTemplate={addRowTemplate}
            onAddRow={handleCreateWord}
            onDeleteRow={handleDeleteWord}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
            onDeleteSelected={handleDeleteSelectedWords}
            isAllowMultiSelect
            isAllowAddRow
            isAllowDelete
            onCellChange={(rowId, key, value) => {
              setWords(prevWords =>
                prevWords.map(w =>
                  w.id === rowId ? { ...w, [key]: value } : w,
                ),
              )
            }}
            onSaveChanges={saveWords}
          />
          <CustomAlert
            title="Предупреждение"
            isOpen={isModalOpen}
            message={modalMessage}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      ) : (
        <Loading />
      )}
    </>
  )
}
