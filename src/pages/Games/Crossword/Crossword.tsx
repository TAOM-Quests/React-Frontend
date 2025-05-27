import { useEffect, useMemo, useRef, useState } from 'react'
import {
  CrosswordDirection,
  CrosswordPlaceWord,
} from '../../../models/crosswordPlaceWord'
import { crossword } from '../../../services/api/gamesModule/games/crossword'
import moment from 'moment'
import { useParams } from 'react-router'
import { useAppSelector } from '../../../hooks/redux/reduxHooks'
import { selectAuth } from '../../../redux/auth/authSlice'
import { CrosswordDifficulty } from '../../../models/crosswordDifficulty'
import { Loading } from '../../../components/Loading/Loading'
import { Switcher } from '../../../components/UI/Switcher/Switcher'
import './Crossword.scss'
import { ContainerBox } from '../../../components/ContainerBox/ContainerBox'
import { Button } from '../../../components/UI/Button/Button'
import { CrosswordRulesModal } from './CrosswordRulesModal/CrosswordRulesModal'

type Direction = 'horizontal' | 'vertical'
type CellAnswers = {
  value: string
}
type UserAnswers = Record<string, CellAnswers> // key: `${x},${y},${direction},${idx}`
interface SaveCrossword {
  day: string
  difficultyId: number
  departmentId: number
  userAnswers: UserAnswers
}

const LOCAL_STORAGE_KEY = 'crossword_user_answers'

export const Crossword = () => {
  const { departmentId } = useParams()
  const user = useAppSelector(selectAuth)

  const [isModalOpen, setIsModalOpen] = useState(false)

  const openRulesModal = () => {
    setIsModalOpen(true)
  }

  const getUserAnswerFromStorage = (): UserAnswers => {
    try {
      if (!departmentId) throw new Error('Department id not found')

      const savedCrosswords = localStorage.getItem(LOCAL_STORAGE_KEY)
      const savedUserAnswer =
        savedCrosswords &&
        (JSON.parse(savedCrosswords) as SaveCrossword[]).find(
          w =>
            w.day === moment().format('YYYY-MM-DD') &&
            w.departmentId === +departmentId &&
            w.difficultyId === currentDifficulty,
        )?.userAnswers
      return savedUserAnswer ? savedUserAnswer : {}
    } catch {
      return {}
    }
  }

  const [isLoading, setIsLoading] = useState(false)
  const [words, setWords] = useState<CrosswordPlaceWord[]>([])
  const [currentDifficulty, setCurrentDifficulty] = useState(0)
  const [difficulties, setDifficulties] = useState<CrosswordDifficulty[]>([])
  const [statuses, setStatuses] = useState<Record<string, boolean | undefined>>(
    {},
  )
  const [userAnswers, setUserAnswers] = useState<UserAnswers>(
    getUserAnswerFromStorage(),
  )
  const [currentDirection, setCurrentDirection] =
    useState<Direction>('horizontal')
  const [focusTarget, setFocusTarget] = useState<string | null>(null)

  // Собираем сетку
  const { cells, minX, minY, maxX, maxY, startNumbers, questions } =
    useMemo(() => {
      const cells: Record<
        string,
        {
          letter: string
          wordIndex: number
          direction: CrosswordDirection
        }
      > = {}
      let minX = 0,
        minY = 0,
        maxX = 0,
        maxY = 0
      const startNumbers: Record<string, number> = {}
      const questions: Record<CrosswordDirection, Record<number, string>> = {
        horizontal: {},
        vertical: {},
      }
      let number = 1

      // Для каждой стартовой ячейки слова присваиваем номер
      const startCellMap = new Map<string, number>()
      words.forEach(w => {
        const startKey = `${w.x},${w.y}`

        if (!startCellMap.has(startKey)) {
          startNumbers[startKey] = number++
          startCellMap.set(startKey, number)
        }

        questions[w.direction][startNumbers[startKey]] = w.question
      })

      words.forEach((w, wi) => {
        for (let i = 0; i < w.length; i++) {
          const cx = w.direction === 'horizontal' ? w.x + i : w.x
          const cy = w.direction === 'vertical' ? w.y + i : w.y
          const key = `${cx},${cy}`
          cells[key] = {
            letter: '',
            wordIndex: wi,
            direction: w.direction,
          }
          minX = Math.min(minX, cx)
          minY = Math.min(minY, cy)
          maxX = Math.max(maxX, cx)
          maxY = Math.max(maxY, cy)
        }
      })
      return { cells, minX, minY, maxX, maxY, startNumbers, questions }
    }, [words])

  // Сохраняем userAnswers в localStorage
  useEffect(() => {
    const savedCrosswords = localStorage.getItem(LOCAL_STORAGE_KEY)

    if (!savedCrosswords) {
      const newCrosswords: SaveCrossword[] = [
        {
          day: moment().format('YYYY-MM-DD'),
          difficultyId: currentDifficulty,
          departmentId: +departmentId!,
          userAnswers,
        },
      ]
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newCrosswords))
    } else {
      const parsedCrosswords: SaveCrossword[] = JSON.parse(savedCrosswords)
      const newCrosswords = [
        ...parsedCrosswords.filter(
          w =>
            w.day === moment().format('YYYY-MM-DD') &&
            w.difficultyId !== currentDifficulty,
        ),
        {
          day: moment().format('YYYY-MM-DD'),
          difficultyId: currentDifficulty,
          departmentId: +departmentId!,
          userAnswers,
        },
      ]
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newCrosswords))
    }
  }, [userAnswers])

  useEffect(() => {
    setIsLoading(true)
    fetchAllowedDifficulties()
    fetchCrossword()
    setIsLoading(false)
  }, [])

  useEffect(() => {
    setIsLoading(true)
    fetchCrossword()
    setIsLoading(false)
  }, [currentDifficulty])

  const fetchAllowedDifficulties = async () => {
    try {
      if (!user) throw new Error('User not found')
      if (!departmentId) throw new Error('Department id not found')

      setDifficulties(
        await crossword.getAllowedDifficulties(+user.id, +departmentId),
      )
    } catch (e) {
      console.log(`[Crossword] ${e}`)
    }
  }

  const fetchCrossword = async () => {
    try {
      if (!departmentId) throw new Error('Department id not found')

      setWords(
        await crossword.getCrossword(
          moment().format('YYYY-MM-DD'),
          +departmentId,
          currentDifficulty + 1,
        ),
      )
    } catch (e) {
      console.log(`[Crossword] ${e}`)
    }
  }

  // Обработка ввода
  const handleInput = (x: number, y: number, value: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [`${x},${y}`]: {
        value: value.slice(-1).toUpperCase(),
      },
    }))

    // переход к следующей ячейке по currentDirection
    let nextX = x,
      nextY = y
    if (currentDirection === 'horizontal') nextX = x + 1
    else nextY = y + 1
    setFocusTarget(`${nextX},${nextY}`)
  }

  useEffect(() => {
    if (focusTarget) {
      const input = document.getElementById(focusTarget)
      if (input) {
        ;(input as HTMLInputElement).focus()
        ;(input as HTMLInputElement).select() // выделить букву для замены
      }
      setFocusTarget(null) // сбрасываем
    }
  }, [focusTarget])

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    x: number,
    y: number,
  ) => {
    const key = `${x},${y}`
    const letter = userAnswers[key]?.value || ''
    if (e.key === 'Backspace') {
      if (letter) {
        setUserAnswers(prev => ({
          ...prev,
          [key]: { value: '' },
        }))
        e.preventDefault()
      } else {
        let prevX = x,
          prevY = y
        if (currentDirection === 'horizontal') prevX = x - 1
        else prevY = y - 1
        const prevKey = `${prevX},${prevY}`
        setUserAnswers(prev => ({
          ...prev,
          [prevKey]: { value: '' },
        }))
        setFocusTarget(prevKey)
        e.preventDefault()
      }
    }
  }

  // Формируем отправляемый ответ пользователя
  const getUserWords = (): CrosswordPlaceWord[] => {
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
        question: w.question,
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
            className="crossword-cell"
            style={{
              background:
                status === undefined ? '#fff' : status ? '#c6f6d5' : '#fed7d7',
            }}
          >
            {startNumber && <span className="body_xs_sb">{startNumber}</span>}
            <input
              id={`${x},${y}`}
              maxLength={1}
              value={userAnswers[`${x},${y}`]?.value || ''}
              onChange={e => handleInput(x, y, e.target.value)}
              onKeyDown={e => handleKeyDown(e, x, y)}
              onClick={() => {
                const cellWords = words.filter(w => {
                  for (let i = 0; i < w.length; i++) {
                    const cx = w.direction === 'horizontal' ? w.x + i : w.x
                    const cy = w.direction === 'vertical' ? w.y + i : w.y
                    if (cx === x && cy === y) return true
                  }
                  return false
                })
                if (cellWords.length === 1)
                  setCurrentDirection(cellWords[0].direction)
                else if (cellWords.length === 2)
                  setCurrentDirection(curr =>
                    curr === 'horizontal' ? 'vertical' : 'horizontal',
                  )
              }}
            />
          </td>,
        )
      } else {
        row.push(<td key={cellKey} className="crossword-cell-empty" />)
      }
    }
    rows.push(<tr key={y}>{row}</tr>)
  }

  const renderQuestions = (
    direction: CrosswordDirection,
    questions: Record<number, string>,
  ) => (
    <div className="crossword-questions">
      <h6 className="heading_6">
        {direction === 'horizontal' ? 'По горизонтали' : 'По вертикали'}
      </h6>
      {Object.keys(questions).map(questionNumber => (
        <div className="body_l_r" key={questionNumber}>
          <b>{questionNumber}.</b> {questions[+questionNumber]}
        </div>
      ))}
    </div>
  )

  return (
    <>
      {!isLoading ? (
        <div className="container_min_width crossword">
          <div className="crossword__header">
            <h5 className="heading_4  crossword__title">Кроссворд</h5>
            {difficulties.length && (
              <Switcher
                options={difficulties.map(d => d.name)}
                activeOption={difficulties[currentDifficulty].name}
                onChange={selected =>
                  setCurrentDifficulty(
                    difficulties.map(d => d.name).indexOf(selected),
                  )
                }
              />
            )}
            <Button
              text="Редактировать игру"
              iconBefore="EDIT"
              colorType="secondary"
            />
          </div>
          <div className="crossword__rules">
            <Button
              text="Правила игры"
              iconBefore="GAME_RULES"
              colorType="secondary"
              size="small"
              onClick={() => openRulesModal()}
            />
          </div>

          <div className="crossword-container">
            <div className="crossword-grid">
              <table className="crossword-table">
                <tbody>{rows}</tbody>
              </table>
            </div>

            <ContainerBox>
              {renderQuestions('horizontal', questions.horizontal)}
              {renderQuestions('vertical', questions.vertical)}
            </ContainerBox>
          </div>

          <Button
            text="Отправить ответ"
            colorType="accent"
            onClick={handleSubmit}
          />

          {isModalOpen && (
            <CrosswordRulesModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
          )}
        </div>
      ) : (
        <Loading />
      )}
    </>
  )
}
