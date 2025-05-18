import { useEffect, useMemo, useState } from 'react'
import {
  CrosswordDirection,
  CrosswordPlaceWord,
} from '../../../models/crosswordPlaceWord'
import { crossword } from '../../../services/api/gamesModule/games/crossword'
import moment from 'moment'
import { useParams } from 'react-router'
import { useAppSelector } from '../../../hooks/redux/reduxHooks'
import { selectAuth } from '../../../redux/auth/authSlice'

type UserAnswers = Record<string, string> // key: `${x},${y},${direction},${idx}`

const LOCAL_STORAGE_KEY = 'crossword_user_answers'

export const Crossword = () => {
  const [words, setWords] = useState<CrosswordPlaceWord[]>([])
  const [userAnswers, setUserAnswers] = useState<UserAnswers>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
      return saved ? JSON.parse(saved) : {}
    } catch {
      return {}
    }
  })
  const [statuses, setStatuses] = useState<Record<string, boolean | undefined>>(
    {},
  )

  const { departmentId } = useParams()
  const user = useAppSelector(selectAuth)

  // Собираем сетку
  const { cells, minX, minY, maxX, maxY, startNumbers } = useMemo(() => {
    const cells: Record<
      string,
      {
        letter: string
        wordIndex: number
        word: string
        direction: CrosswordDirection
      }
    > = {}
    let minX = 0,
      minY = 0,
      maxX = 0,
      maxY = 0
    const startNumbers: Record<string, number> = {}
    let number = 1

    // Для каждой стартовой ячейки слова присваиваем номер
    const startCellSet = new Set<string>()
    words.forEach(w => {
      const startKey = `${w.x},${w.y}`
      if (!startCellSet.has(startKey)) {
        startNumbers[startKey] = number++
        startCellSet.add(startKey)
      }
    })

    words.forEach((w, wi) => {
      for (let i = 0; i < w.length; i++) {
        const cx = w.direction === 'horizontal' ? w.x + i : w.x
        const cy = w.direction === 'vertical' ? w.y + i : w.y
        const key = `${cx},${cy}`
        cells[key] = {
          letter: w.word ? w.word[i] : '',
          wordIndex: wi,
          word: '',
          direction: w.direction,
        }
        minX = Math.min(minX, cx)
        minY = Math.min(minY, cy)
        maxX = Math.max(maxX, cx)
        maxY = Math.max(maxY, cy)
      }
    })
    return { cells, minX, minY, maxX, maxY, startNumbers }
  }, [words])

  // Сохраняем userAnswers в localStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userAnswers))
  }, [userAnswers])

  useEffect(() => {
    const fetchCrossword = async () => {
      try {
        if (!departmentId) throw new Error('Department id not found')

        setWords(
          await crossword.getCrossword(
            moment().format('YYYY-MM-DD'),
            +departmentId,
            1,
          ),
        )
      } catch (e) {
        console.log(`[Crossword] ${e}`)
      }
    }

    fetchCrossword()
  }, [])

  // Обработка ввода
  const handleInput = (
    x: number,
    y: number,
    direction: CrosswordDirection,
    idx: number,
    value: string,
  ) => {
    const key = `${x},${y},${direction},${idx}`
    setUserAnswers(prev => ({
      ...prev,
      [key]: value.slice(-1).toUpperCase(),
    }))
  }

  // Формируем отправляемый ответ пользователя
  const getUserWords = () => {
    return words.map(w => {
      let answer = ''
      for (let i = 0; i < w.length; i++) {
        const key = `${w.x},${w.y},${w.direction},${i}`
        answer += userAnswers[key] || ''
      }
      return {
        x: w.x,
        y: w.y,
        word: answer,
        length: w.length,
        direction: w.direction,
      }
    })
  }

  // Отправка на API
  const handleSubmit = async () => {
    try {
      if (!user?.id) throw new Error('User id not found')
      if (!departmentId) throw new Error('Department id not found')

      const checkerAnswers = await crossword.checkAnswer({
        words: getUserWords(),
        userId: 1,
        departmentId: +departmentId,
        difficultyId: 1,
      })
      const newStatuses: Record<string, boolean> = {}
      checkerAnswers.forEach(w => {
        for (let i = 0; i < w.length; i++) {
          const key = `${w.x},${w.y},${w.direction},${i}`
          newStatuses[key] = !!w.isCorrect
        }
      })
      setStatuses(newStatuses)
    } catch (e) {
      console.log(`[Crossword] ${e}`)
    }
  }

  // Рендерим сетку
  const rows = []
  for (let y = minY; y <= maxY; y++) {
    const row = []
    for (let x = minX; x <= maxX; x++) {
      const cellKey = `${x},${y}`
      if (cells[cellKey]) {
        // Найти все слова, которые проходят через эту ячейку
        const cellWords = words.filter(w => {
          for (let i = 0; i < w.length; i++) {
            const cx = w.direction === 'horizontal' ? w.x + i : w.x
            const cy = w.direction === 'vertical' ? w.y + i : w.y
            if (cx === x && cy === y) return true
          }
          return false
        })
        // Для простоты берём первое подходящее слово
        const mainWord = cellWords[0]
        let idx = 0
        if (mainWord.direction === 'horizontal') idx = x - mainWord.x
        else idx = y - mainWord.y
        const inputKey = `${mainWord.x},${mainWord.y},${mainWord.direction},${idx}`
        const status = statuses[inputKey]
        const startNumber = startNumbers[cellKey]

        row.push(
          <td
            key={cellKey}
            style={{
              border: '1px solid #333',
              width: 32,
              height: 32,
              textAlign: 'center',
              background:
                status === undefined ? '#fff' : status ? '#c6f6d5' : '#fed7d7',
              position: 'relative',
              verticalAlign: 'top',
              padding: 0,
            }}
          >
            {startNumber && (
              <span
                style={{
                  position: 'absolute',
                  top: 2,
                  left: 2,
                  fontSize: 10,
                  color: '#555',
                }}
              >
                {startNumber}
              </span>
            )}
            <input
              maxLength={1}
              style={{
                width: '90%',
                height: '90%',
                textAlign: 'center',
                fontSize: 20,
                border: 'none',
                outline: 'none',
                background: 'transparent',
                color: '#222',
                fontWeight: 'bold',
                marginTop: startNumber ? 8 : 0,
              }}
              value={userAnswers[inputKey] || ''}
              onChange={e =>
                handleInput(
                  mainWord.x,
                  mainWord.y,
                  mainWord.direction as CrosswordDirection,
                  idx,
                  e.target.value,
                )
              }
            />
          </td>,
        )
      } else {
        row.push(
          <td
            key={cellKey}
            style={{
              border: '1px solid #eee',
              width: 32,
              height: 32,
              background: '#ccc',
            }}
          />,
        )
      }
    }
    rows.push(<tr key={y}>{row}</tr>)
  }

  return (
    <div>
      <table style={{ borderCollapse: 'collapse', margin: 16 }}>
        <tbody>{rows}</tbody>
      </table>
      <button onClick={handleSubmit} style={{ marginTop: 16 }}>
        Отправить ответ
      </button>
    </div>
  )
}
