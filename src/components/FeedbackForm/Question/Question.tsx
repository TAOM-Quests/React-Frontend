import React, { useState, useEffect, useMemo } from 'react'
import { FeedbackQuestion } from '../../../models/feedbackQuestion'
import { Icon } from '../../UI/Icon/Icon'
import Input from '../../UI/Input/Input'
import { Button } from '../../UI/Button/Button'
import { NumberInput } from '../../UI/NumberInput/NumberInput'
import './Question.scss'
import { selectAuth } from '../../../redux/auth/authSlice'
import { useAppSelector } from '../../../hooks/redux/reduxHooks'
import { FeedbackStarRating } from './FeedbackParticipantQuestions/FeedbackStarRating/FeedbackStarRating'
import { FeedbackRadio } from './FeedbackParticipantQuestions/FeedbackRadio/FeedbackRadio'

interface QuestionProps {
  question: FeedbackQuestion
  onChange: (updatedQuestion: FeedbackQuestion) => void
  onDelete: () => void
}

export const Question = ({ question, onChange, onDelete }: QuestionProps) => {
  const [localQuestion, setLocalQuestion] = useState<FeedbackQuestion>(question)
  const [ratingAnswer, setRatingAnswer] = React.useState(0)
  const [selectedRadioAnswer, setSelectedRadioAnswer] = React.useState<
    string | null
  >(null)

  const user = useAppSelector(selectAuth)
  const isEmployee = user?.isEmployee

  useEffect(() => {
    setLocalQuestion(question)
  }, [question])

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
    <div className="question-editor">
      <div className="question-editor__question">
        <Input
          type="text"
          label="Вопрос"
          value={localQuestion.question}
          onChange={handleQuestionTextChange}
          placeholder="Введите текст вопроса"
        />
        <div className="question-editor__delete">
          <Icon icon="DELETE" onClick={onDelete} />
        </div>
      </div>

      <div>
        <p className="body_l_m">{localQuestion.question}</p>
      </div>

      {localQuestion.type === 'rating' && localQuestion.answers && (
        <div className="question-editor__rating">
          <NumberInput
            label="Минимальное значение рейтинга"
            value={+localQuestion.answers[0]}
            onChange={val => {
              if (val === null) return
              if (val >= 1) {
                const updated = {
                  ...localQuestion,
                  answers: [val.toString()],
                }
                setLocalQuestion(updated)
                onChange(updated)
              }
            }}
          />

          <div>
            <FeedbackStarRating
              maxRating={
                localQuestion.answers ? Number(localQuestion.answers[0]) : 5
              }
              value={ratingAnswer}
              onChange={setRatingAnswer}
            />
          </div>
        </div>
      )}

      {localQuestion.type === 'radio' && localQuestion.answers && (
        <div className="question-editor__radio">
          <label className="body_s_sb label">Варианты ответов</label>
          <div className="question-editor__radio-answers">
            {localQuestion.answers.map((ans, i) => (
              <div key={i} className="question-editor__radio-answers-item">
                <Input
                  type="text"
                  value={ans}
                  onChange={e => handleAnswersChange(e, i)}
                  placeholder="Вариант ответа"
                />
                <div className="question-editor__radio-answers-item__delete">
                  <Icon icon="CROSS" onClick={() => removeAnswerOption(i)} />
                </div>
              </div>
            ))}
          </div>
          <div>
            <Button
              text="Добавить вариант"
              type="button"
              colorType="secondary"
              size="small"
              iconBefore="ADD"
              onClick={addAnswerOption}
            />
          </div>
        </div>
      )}

      {localQuestion.type === 'scale' && localQuestion.answers && (
        <div className="question-editor__scale">
          <div className="question-editor__scale--min">
            <NumberInput
              value={localQuestion.answers ? +localQuestion.answers[0] : 0}
              onChange={val => {
                if (val === null) return
                if (!localQuestion.answers) return
                const updatedAnswers = [...localQuestion.answers]
                updatedAnswers[0] = val.toString()
                const updated = {
                  ...localQuestion,
                  answers: updatedAnswers,
                }
                setLocalQuestion(updated)
                onChange(updated)
              }}
              placeholder="Минимальное значение"
            />
          </div>
          <div className="question-editor__scale--min-name">
            <Input
              value={localQuestion.answers[1]}
              onChange={e => {
                if (!localQuestion.answers) return
                const updatedAnswers = [...localQuestion.answers]
                updatedAnswers[1] = e.target.value
                const updated = {
                  ...localQuestion,
                  answers: updatedAnswers,
                }
                setLocalQuestion(updated)
                onChange(updated)
              }}
              placeholder="Подпись для минимального значения"
            />
          </div>
          <div className="question-editor__scale--max">
            <NumberInput
              value={localQuestion.answers ? +localQuestion.answers[2] : 0}
              onChange={val => {
                if (val === null) return
                if (!localQuestion.answers) return
                const updatedAnswers = [...localQuestion.answers]
                updatedAnswers[2] = val.toString()
                const updated = {
                  ...localQuestion,
                  answers: updatedAnswers,
                }
                setLocalQuestion(updated)
                onChange(updated)
              }}
              placeholder="Максимальное значение"
            />
          </div>
          <div className="question-editor__scale--max-name">
            <Input
              value={localQuestion.answers[3]}
              onChange={e => {
                if (!localQuestion.answers) return
                const updatedAnswers = [...localQuestion.answers]
                updatedAnswers[3] = e.target.value
                const updated = {
                  ...localQuestion,
                  answers: updatedAnswers,
                }
                setLocalQuestion(updated)
                onChange(updated)
              }}
              placeholder="Подпись для максимального значения"
            />
          </div>
        </div>
      )}

      {isEmployee && (
        <>
          {localQuestion.type === 'radio' && localQuestion.answers && (
            <FeedbackRadio
              answers={localQuestion.answers}
              selectedAnswer={selectedRadioAnswer}
              onChange={setSelectedRadioAnswer}
            />
          )}
        </>
      )}

      <div className="lineDash"></div>
    </div>
  )
}
