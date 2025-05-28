import { useState, useEffect, useCallback } from 'react'
import './Wordle.scss'
import { useParams } from 'react-router'
import {
  WordleAttempt,
  WordleAttemptLetterStatus,
} from '../../../models/wordleAttempt'
import { wordle } from '../../../services/api/gamesModule/games/wordle'
import { Button } from '../../../components/UI/Button/Button'
import { useAppSelector } from '../../../hooks/redux/reduxHooks'
import { selectAuth } from '../../../redux/auth/authSlice'
import { upperCase } from 'lodash'
import { Loading } from '../../../components/Loading/Loading'
import moment from 'moment'
import { WordleRulesModal } from './WordleRulesModal/WordleRulesModal'

const RUSSIAN_ALPHABET = [
  'Й',
  'Ц',
  'У',
  'К',
  'Е',
  'Н',
  'Г',
  'Ш',
  'Щ',
  'З',
  'Х',
  'Ъ',
  'Ф',
  'Ы',
  'В',
  'А',
  'П',
  'Р',
  'О',
  'Л',
  'Д',
  'Ж',
  'Э',
  'Я',
  'Ч',
  'С',
  'М',
  'И',
  'Т',
  'Ь',
  'Б',
  'Ю',
]

const MAX_ATTEMPTS = 6
const WORD_LENGTH = 5

export const Wordle = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)
  const [currentGuess, setCurrentGuess] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [prevAttempts, setPrevAttempts] = useState<WordleAttempt[]>([])
  const [keyboardStatus, setKeyboardStatus] = useState<
    Record<string, WordleAttemptLetterStatus>
  >({})
  const [isModalOpen, setIsModalOpen] = useState(false)

  const user = useAppSelector(selectAuth)
  const { id: departmentId } = useParams<{ id: string }>()

  useEffect(() => {
    setIsLoading(true)

    const fetchAttempts = async () => {
      if (!user || !departmentId) return

      const attempts = await wordle.getAttempts(
        user.id,
        moment().format('YYYY-MM-DD'),
        +departmentId!,
      )

      setPrevAttempts(attempts)
      setKeyboardStatus(prevKeyboard => {
        attempts.forEach(attempt => {
          attempt.letters.forEach(({ name, status }) => {
            const prevLetterStatus = prevKeyboard[name]
            if (status === 'correct' || prevLetterStatus === 'correct') {
              prevKeyboard[name] = 'correct'
            } else if (status === 'present' || prevLetterStatus === 'present') {
              prevKeyboard[name] = 'present'
            } else if (!prevLetterStatus) {
              prevKeyboard[name] = 'absent'
            }
          })
        })

        return prevKeyboard
      })
    }

    fetchAttempts()

    setIsLoading(false)
  }, [departmentId])

  const openRulesModal = () => setIsModalOpen(true)

  const handleLetterInput = useCallback(
    (letter: string) => {
      if (isGameOver) return
      if (
        currentGuess.length < WORD_LENGTH &&
        RUSSIAN_ALPHABET.includes(letter)
      ) {
        setCurrentGuess(prev => prev + letter)
      }
    },
    [currentGuess, isGameOver, WORD_LENGTH],
  )

  const handleBackspace = useCallback(() => {
    if (isGameOver) return
    setCurrentGuess(prev => prev.slice(0, -1))
  }, [isGameOver])

  const handleEnter = async () => {
    if (isGameOver || currentGuess.length !== WORD_LENGTH) return

    try {
      setError(null)

      if (!user) throw new Error('User not found')
      if (!departmentId) throw new Error('Department id not found')

      const newAttempt = await wordle.addAttempt(
        upperCase(currentGuess),
        user.id,
        +departmentId,
      )

      setCurrentGuess('')
      setPrevAttempts(prevAttempts => [...prevAttempts, newAttempt])
      setKeyboardStatus(prevKeyboard => {
        newAttempt.letters.forEach(({ name, status }) => {
          const prevLetterStatus = prevKeyboard[name]
          if (status === 'correct' || prevLetterStatus === 'correct') {
            prevKeyboard[name] = 'correct'
          } else if (status === 'present' || prevLetterStatus === 'present') {
            prevKeyboard[name] = 'present'
          } else if (!prevLetterStatus) {
            prevKeyboard[name] = 'absent'
          }
        })
        return prevKeyboard
      })

      const isCorrect = newAttempt.letters.every(
        letter => letter.status === 'correct',
      )

      if (isCorrect) {
        setIsGameOver(true)
      } else if (prevAttempts.length + 1 === MAX_ATTEMPTS) {
        setIsGameOver(true)
      }
    } catch (e) {
      if (+(e as Error).message.split(' - ')[0] === 404) {
        setError('Слово не существует')
      }

      console.log(`[Wordle] ${e}`)
    }
  }

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase()

      if (key === 'ENTER') {
        e.preventDefault()
        handleEnter()
      } else if (key === 'BACKSPACE') {
        e.preventDefault()
        handleBackspace()
      } else if (RUSSIAN_ALPHABET.includes(key)) {
        e.preventDefault()
        handleLetterInput(key)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [handleBackspace, handleEnter, handleLetterInput])

  return !isLoading ? (
    <div className="container_min_width wordle">
      <div className="wordle__header">
        <h5 className="heading_4  wordle__title">5 букв</h5>
        <div className="wordle__rules">
          <Button
            text="Правила игры"
            iconBefore="GAME_RULES"
            colorType="secondary"
            size="small"
            onClick={() => openRulesModal()}
          />
          <Button
            text="Редактировать игру"
            iconBefore="EDIT"
            colorType="secondary"
          />
        </div>
      </div>

      <div className="board">
        {Array(MAX_ATTEMPTS)
          .fill(null)
          .map((_, attemptIndex) => {
            const attempt = prevAttempts[attemptIndex]
            return (
              <div className="row" key={attemptIndex}>
                {Array(WORD_LENGTH)
                  .fill('')
                  .map((_, i) => {
                    const letterInfo = attempt?.letters[i]
                    const status = letterInfo?.status || ''
                    const letter =
                      attempt?.letters[i]?.name ||
                      (attemptIndex === prevAttempts.length
                        ? currentGuess[i] || ''
                        : '')
                    return (
                      <div className={`cell ${status}`} key={i}>
                        {letter}
                      </div>
                    )
                  })}
              </div>
            )
          })}
      </div>

      {!isGameOver && (
        <div className="keyboard">
          {[
            RUSSIAN_ALPHABET.slice(0, 12),
            RUSSIAN_ALPHABET.slice(12, 23),
            RUSSIAN_ALPHABET.slice(23),
          ].map((row, idx) => (
            <div className="keyboard-row" key={idx}>
              {idx === 2 && (
                <Button
                  iconBefore="CHECK"
                  isIconOnly
                  onClick={handleEnter}
                  className="special"
                />
              )}
              {row.map(letter => (
                <button
                  key={letter}
                  className={`key ${keyboardStatus[letter] || ''}`}
                  onClick={() => handleLetterInput(letter)}
                  type="button"
                >
                  {letter}
                </button>
              ))}
              {idx === 2 && (
                <Button
                  iconBefore="BACKSPACE"
                  isIconOnly
                  colorType="secondary"
                  onClick={handleBackspace}
                  className="special"
                />
              )}
            </div>
          ))}
        </div>
      )}
      {error && <div className="error-message">{error}</div>}
      {isGameOver && (
        <div className="result">
          {prevAttempts.some(attempt =>
            attempt.letters.every(letter => letter.status === 'correct'),
          )
            ? 'Поздравляем! Вы угадали!'
            : 'Игра окончена!'}
        </div>
      )}
      {isModalOpen && (
        <WordleRulesModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  ) : (
    <Loading />
  )
}
