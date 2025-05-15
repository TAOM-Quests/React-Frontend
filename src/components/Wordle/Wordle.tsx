import { useState, useEffect, useCallback } from 'react'
import { Button } from '../UI/Button/Button'
import './Wordle.scss'
import { useAppSelector } from '../../hooks/redux/reduxHooks'
import { selectAuth } from '../../redux/auth/authSlice'
import { useParams } from 'react-router'

interface LetterInfo {
  name: string
  status: LetterStatus
}

interface GuessResponse {
  letters: LetterInfo[]
}

type LetterStatus = 'correct' | 'present' | 'absent' | ''

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

export const Wordle = () => {
  const [guessResponses, setGuessResponses] = useState<GuessResponse[]>([])
  const [currentGuess, setCurrentGuess] = useState('')
  const [attempt, setAttempt] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [keyboardStatus, setKeyboardStatus] = useState<
    Record<string, LetterStatus>
  >({})
  const [error, setError] = useState<string | null>(null)
  const MAX_ATTEMPTS = 6
  const WORD_LENGTH = 5

  const user = useAppSelector(selectAuth)
  const date = new Date()

  const { id } = useParams<{ id: string }>()
  const departmentId = Number(id)

  const handleLetterInput = useCallback(
    (letter: string) => {
      if (gameOver) return
      if (
        currentGuess.length < WORD_LENGTH &&
        RUSSIAN_ALPHABET.includes(letter)
      ) {
        setCurrentGuess(prev => prev + letter)
      }
    },
    [currentGuess, gameOver, WORD_LENGTH],
  )

  const handleBackspace = useCallback(() => {
    if (gameOver) return
    setCurrentGuess(prev => prev.slice(0, -1))
  }, [gameOver])

  const handleEnter = async () => {
    if (gameOver) return
    if (currentGuess.length !== WORD_LENGTH) return

    try {
      setError(null)

      const response = await fetch(`/api/wordle/attempts/${user?.id}`)

      if (!response.ok) {
        setError('Слово не существует')
        return
      }

      const data: GuessResponse[] = await response.json()

      setGuessResponses(data)
      setCurrentGuess('')

      const newKeyboardStatus: Record<string, LetterStatus> = {
        ...keyboardStatus,
      }
      data.forEach(guessResp => {
        guessResp.letters.forEach(({ name, status }) => {
          const prev = newKeyboardStatus[name]
          if (status === 'correct' || prev === 'correct') {
            newKeyboardStatus[name] = 'correct'
          } else if (status === 'present' || prev === 'present') {
            newKeyboardStatus[name] = 'present'
          } else if (!prev) {
            newKeyboardStatus[name] = 'absent'
          }
        })
      })
      setKeyboardStatus(newKeyboardStatus)

      const lastGuess = data[data.length - 1]
      const isCorrect = lastGuess.letters.every(
        letter => letter.status === 'correct',
      )

      if (isCorrect) {
        setGameOver(true)
      } else if (data.length === MAX_ATTEMPTS) {
        setGameOver(true)
      } else {
        setAttempt(data.length)
      }
    } catch (error) {
      setError('Ошибка сети или сервера')
      console.error(error)
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

  return (
    <div className="wordle">
      <div className="board">
        {Array(MAX_ATTEMPTS)
          .fill(null)
          .map((_, idx) => {
            const guessResp = guessResponses[idx]
            return (
              <div className="row" key={idx}>
                {Array(WORD_LENGTH)
                  .fill('')
                  .map((_, i) => {
                    const letterInfo = guessResp?.letters[i]
                    const status = letterInfo?.status || ''
                    const letter =
                      guessResp?.letters[i]?.name ||
                      (idx === attempt ? currentGuess[i] || '' : '')
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

      {!gameOver && (
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
      {gameOver && (
        <div className="result">
          {guessResponses.some(guessResp =>
            guessResp.letters.every(letter => letter.status === 'correct'),
          )
            ? 'Поздравляем! Вы угадали!'
            : 'Игра окончена!'}
        </div>
      )}
    </div>
  )
}
