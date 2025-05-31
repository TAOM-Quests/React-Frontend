import React, { useState, useEffect } from 'react'
import { Question, QuestionType } from './feedback'

interface QuestionEditorProps {
  question: Question
  onChange: (updatedQuestion: Question) => void
  onDelete: () => void
}

const QUESTION_TYPES: QuestionType[] = ['rating', 'radio', 'scale', 'text']

export const QuestionEditor = ({
  question,
  onChange,
  onDelete,
}: QuestionEditorProps) => {
  const [localQuestion, setLocalQuestion] = useState<Question>(question)

  useEffect(() => {
    setLocalQuestion(question)
  }, [question])

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value as QuestionType
    let newQuestion: Question = { ...localQuestion, type: newType }

    switch (newType) {
      case 'rating':
        newQuestion.answers = ['5']
        break
      case 'radio':
        newQuestion.answers = ['Да', 'Нет']
        break
      case 'scale':
        newQuestion.answers = ['1', 'Не возможно', '10', 'Возможно']
        break
      case 'text':
        newQuestion.answers = []
        break
    }
    setLocalQuestion(newQuestion)
    onChange(newQuestion)
  }

  const handleQuestionTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updated = { ...localQuestion, question: e.target.value }
    setLocalQuestion(updated)
    onChange(updated)
  }

  const handleAnswersChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (!localQuestion.answers) return
    const newAnswers = [...localQuestion.answers]
    newAnswers[index] = e.target.value
    const updated = { ...localQuestion, answers: newAnswers }
    setLocalQuestion(updated)
    onChange(updated)
  }

  const addAnswerOption = () => {
    const newAnswers = localQuestion.answers
      ? [...localQuestion.answers, '']
      : ['']
    const updated = { ...localQuestion, answers: newAnswers }
    setLocalQuestion(updated)
    onChange(updated)
  }

  const removeAnswerOption = (index: number) => {
    if (!localQuestion.answers) return
    const newAnswers = [...localQuestion.answers]
    newAnswers.splice(index, 1)
    const updated = { ...localQuestion, answers: newAnswers }
    setLocalQuestion(updated)
    onChange(updated)
  }

  return (
    <div style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
      <label>
        Тип вопроса:
        <select value={localQuestion.type} onChange={handleTypeChange}>
          {QUESTION_TYPES.map(type => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Вопрос:
        <input
          type="text"
          value={localQuestion.question}
          onChange={handleQuestionTextChange}
          placeholder="Введите текст вопроса"
        />
      </label>
      <br />

      {localQuestion.type === 'radio' && localQuestion.answers && (
        <div>
          <label>Варианты ответов:</label>
          {localQuestion.answers.map((ans, i) => (
            <div key={i}>
              <input
                type="text"
                value={ans}
                onChange={e => handleAnswersChange(e, i)}
                placeholder="Вариант ответа"
              />
              <button type="button" onClick={() => removeAnswerOption(i)}>
                Удалить
              </button>
            </div>
          ))}
          <button type="button" onClick={addAnswerOption}>
            Добавить вариант
          </button>
        </div>
      )}

      {localQuestion.type === 'scale' && localQuestion.answers && (
        <div>
          <label>Варианты ответов:</label>
          {localQuestion.answers.map((ans, i) => (
            <div key={i}>
              <input
                type="text"
                value={ans}
                onChange={e => handleAnswersChange(e, i)}
                placeholder="Вариант ответа"
              />
            </div>
          ))}
        </div>
      )}

      {localQuestion.type === 'rating' && localQuestion.answers && (
        <div>
          <label>
            Минимальное значение рейтинга:
            <input
              type="number"
              min={1}
              value={localQuestion.answers[0]}
              onChange={e => {
                const val = e.target.value
                if (+val >= 1) {
                  const updated = { ...localQuestion, answers: [val] }
                  setLocalQuestion(updated)
                  onChange(updated)
                }
              }}
            />
          </label>
        </div>
      )}

      {localQuestion.type === 'text' && (
        <div>Ответы не требуются для текстового вопроса</div>
      )}

      <button type="button" onClick={onDelete}>
        Удалить вопрос
      </button>
    </div>
  )
}
