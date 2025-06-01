import React, { useState, useEffect, useMemo } from 'react'
import { FeedbackQuestion as FeedbackQuestionType } from '../../../models/feedbackQuestion'
import { Icon } from '../../UI/Icon/Icon'
import Input from '../../UI/Input/Input'
import { Button } from '../../UI/Button/Button'
import { NumberInput } from '../../UI/NumberInput/NumberInput'
import './FeedbackQuestion.scss'
import { selectAuth } from '../../../redux/auth/authSlice'
import { useAppSelector } from '../../../hooks/redux/reduxHooks'
import { FeedbackRadio } from './FeedbackParticipantQuestions/FeedbackRadio/FeedbackRadio'
import { FeedbackRatingQuestion } from './FeedbackQuestionTypes/FeedbackRatingQuestion/FeedbackRatingQuestion'
import { FeedbackRadioQuestion } from './FeedbackQuestionTypes/FeedbackRatingQuestion/FeedbackRadioQuestion/FeedbackRadioQuestion'
import { FeedbackScale } from './FeedbackParticipantQuestions/FeedbackScale/FeedbackScale'

interface FeedbackQuestionProps {
  question: FeedbackQuestionType
  onChange: (updatedQuestion: FeedbackQuestionType) => void
  onDelete: () => void
}

export const FeedbackQuestion = ({
  question,
  onChange,
  onDelete,
}: FeedbackQuestionProps) => {
  const [localQuestion, setLocalQuestion] =
    useState<FeedbackQuestionType>(question)
  const [ratingAnswer, setRatingAnswer] = React.useState(0)
  const [selectedRadioAnswer, setSelectedRadioAnswer] = React.useState<
    string | null
  >(null)
  const [scaleAnswer, setScaleAnswer] = useState(0)

  const user = useAppSelector(selectAuth)
  const isEmployee = user?.isEmployee

  console.log(scaleAnswer)

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
        <FeedbackRatingQuestion
          localQuestion={localQuestion}
          ratingAnswer={ratingAnswer}
          setRatingAnswer={setRatingAnswer}
          setLocalQuestion={setLocalQuestion}
          onChange={onChange}
        />
      )}

      {localQuestion.type === 'radio' && localQuestion.answers && (
        <FeedbackRadioQuestion
          localQuestion={localQuestion}
          selectedRadioAnswer={selectedRadioAnswer}
          setSelectedRadioAnswer={setSelectedRadioAnswer}
          handleAnswersChange={handleAnswersChange}
          removeAnswerOption={removeAnswerOption}
          addAnswerOption={addAnswerOption}
        />
      )}

      {localQuestion.type === 'scale' && localQuestion.answers && (
        <>
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
          <FeedbackScale
            min={localQuestion.answers ? +localQuestion.answers[0] : 0}
            minLabel={localQuestion.answers[1]}
            max={localQuestion.answers ? +localQuestion.answers[2] : 0}
            maxLabel={localQuestion.answers[3]}
            value={scaleAnswer}
            onChange={setScaleAnswer}
          />
        </>
      )}

      <div className="lineDash"></div>
    </div>
  )
}
