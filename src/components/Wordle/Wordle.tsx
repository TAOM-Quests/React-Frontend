import React, { useState, useEffect, useCallback } from 'react'
import './Wordle.scss'

export interface WordleProps {
  word: string // Загаданное слово, например: "РЕАКТ"
  maxAttempts?: number // Максимальное число попыток (по умолчанию 6)
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

const getStatuses = (guess: string, answer: string): LetterStatus[] => {
  const result: LetterStatus[] = Array(guess.length).fill('')
  const answerLetterCount: Record<string, number> = {}

  // Подсчёт количества каждой буквы в ответе
  for (const ch of answer) {
    answerLetterCount[ch] = (answerLetterCount[ch] || 0) + 1
  }

  // Сначала отмечаем правильные буквы (зелёные)
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === answer[i]) {
      result[i] = 'correct'
      answerLetterCount[guess[i]] -= 1
    }
  }

  // Затем отмечаем буквы, которые есть в слове, но не на своём месте (жёлтые)
  for (let i = 0; i < guess.length; i++) {
    if (result[i] === '') {
      const letter = guess[i]
      if (answerLetterCount[letter] > 0) {
        result[i] = 'present'
        answerLetterCount[letter] -= 1
      } else {
        result[i] = 'absent'
      }
    }
  }

  return result
}

export const Wordle: React.FC<WordleProps> = ({ word, maxAttempts = 6 }) => {
  const WORD_LENGTH = word.length
  const [guesses, setGuesses] = useState<string[]>(Array(maxAttempts).fill(''))
  const [currentGuess, setCurrentGuess] = useState('')
  const [attempt, setAttempt] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [keyboardStatus, setKeyboardStatus] = useState<
    Record<string, LetterStatus>
  >({})

  // Обработчик ввода буквы (через физ. клавиатуру или виртуальную)
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

  // Обработчик Backspace
  const handleBackspace = useCallback(() => {
    if (gameOver) return
    setCurrentGuess(prev => prev.slice(0, -1))
  }, [gameOver])

  // Обработчик Enter
  const handleEnter = useCallback(() => {
    if (gameOver) return
    if (currentGuess.length !== WORD_LENGTH) return

    // Добавляем текущую попытку в guesses
    const newGuesses = [...guesses]
    newGuesses[attempt] = currentGuess
    setGuesses(newGuesses)

    // Обновляем статусы клавиатуры
    const statuses = getStatuses(currentGuess, word)
    const newKeyboardStatus = { ...keyboardStatus }
    currentGuess.split('').forEach((char, idx) => {
      const prev = newKeyboardStatus[char]
      if (statuses[idx] === 'correct' || prev === 'correct') {
        newKeyboardStatus[char] = 'correct'
      } else if (statuses[idx] === 'present' || prev === 'present') {
        newKeyboardStatus[char] = 'present'
      } else {
        newKeyboardStatus[char] = 'absent'
      }
    })
    setKeyboardStatus(newKeyboardStatus)

    if (currentGuess === word || attempt === maxAttempts - 1) setGameOver(true)
    setAttempt(attempt + 1)
    setCurrentGuess('')
  }, [
    attempt,
    currentGuess,
    gameOver,
    guesses,
    keyboardStatus,
    maxAttempts,
    word,
  ])

  // Обработчик нажатий с физической клавиатуры
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
        {guesses.map((guess, idx) => {
          const statuses = guess
            ? getStatuses(guess, word)
            : Array(WORD_LENGTH).fill('')
          return (
            <div className="row" key={idx}>
              {Array(WORD_LENGTH)
                .fill('')
                .map((_, i) => (
                  <div className={`cell ${statuses[i]}`} key={i}>
                    {guess[i] || (idx === attempt && currentGuess[i]) || ''}
                  </div>
                ))}
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
                <button className="key special" onClick={handleEnter}>
                  ✓
                </button>
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
                <button className="key special" onClick={handleBackspace}>
                  ⌫
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {gameOver && (
        <div className="result">
          {guesses.includes(word)
            ? 'Поздравляем! Вы угадали!'
            : `Игра окончена! Ответ: ${word}`}
        </div>
      )}
    </div>
  )
}
