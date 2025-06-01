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
import { FeedbackRadioQuestion } from './FeedbackQuestionTypes/FeedbackRadioQuestion/FeedbackRadioQuestion'
import { FeedbackScale } from './FeedbackParticipantQuestions/FeedbackScale/FeedbackScale'
import { FeedbackScaleQuestion } from './FeedbackQuestionTypes/FeedbackScaleQuestion/FeedbackScaleQuestion'
import { TextEditor } from '../../TextEditor/TextEditor'

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
  const [textAnswer, setTextAnswer] = useState('')

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
      {isEmployee && (
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
      )}
      {!isEmployee && (
        <div>
          <p className="body_l_m">{localQuestion.question}</p>
        </div>
      )}

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
        <FeedbackScaleQuestion
          localQuestion={localQuestion}
          setLocalQuestion={setLocalQuestion}
          onChange={onChange}
          scaleAnswer={scaleAnswer}
          setScaleAnswer={setScaleAnswer}
        />
      )}

      {localQuestion.type === 'text' && localQuestion.answers && (
        <>
          {isEmployee && <p className="body_m_r">Развернутый ответ...</p>}
          {!isEmployee && (
            <TextEditor
              value={textAnswer ?? ''}
              placeholder="Введите ответ"
              onChange={({ editor }) => {
                const html = editor.getHTML()
                setTextAnswer(html)
              }}
            />
          )}
        </>
      )}

      <div className="lineDash"></div>
    </div>
  )
}
