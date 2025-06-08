import React, { useState, useEffect } from 'react'
import { FeedbackQuestion as FeedbackQuestionType } from '../../../../models/feedbackQuestion'
import { Icon } from '../../../UI/Icon/Icon'
import Input from '../../../UI/Input/Input'
import { selectAuth } from '../../../../redux/auth/authSlice'
import { useAppSelector } from '../../../../hooks/redux/reduxHooks'
import { FeedbackQuestionRating } from './Rating/FeedbackRatingQuestion'
import { FeedbackQuestionRadio } from './Radio/FeedbackQuestionRadio'
import { FeedbackQuestionScale } from './Scale/FeedbackQuestionScale'
import { FeedbackQuestionText } from './Text/FeedbackQuestionText'
import './FeedbackQuestion.scss'

interface FeedbackQuestionProps {
  question: FeedbackQuestionType
  onDelete: () => void
  onChangeAnswer: (answer: string) => void
  onChangeQuestion: (updatedQuestion: FeedbackQuestionType) => void
}

export const FeedbackQuestion = ({
  question,
  onDelete,
  onChangeAnswer,
  onChangeQuestion,
}: FeedbackQuestionProps) => {
  const [localQuestion, setLocalQuestion] =
    useState<FeedbackQuestionType>(question)
  const [ratingAnswer, setRatingAnswer] = useState(0)
  const [selectedRadioAnswer, setSelectedRadioAnswer] = useState('')
  const [scaleAnswer, setScaleAnswer] = useState(0)
  const [textAnswer, setTextAnswer] = useState('')

  const user = useAppSelector(selectAuth)
  const isEmployee = user?.isEmployee

  useEffect(() => {
    setLocalQuestion(question)
  }, [question])

  useEffect(() => {
    let newUserAnswer = ''

    if (localQuestion.type === 'radio') {
      newUserAnswer = selectedRadioAnswer
    } else if (localQuestion.type === 'rating') {
      newUserAnswer = `${ratingAnswer}`
    } else if (localQuestion.type === 'scale') {
      newUserAnswer = `${scaleAnswer}`
    } else if (localQuestion.type === 'text') {
      newUserAnswer = textAnswer
    }

    onChangeAnswer(newUserAnswer)
  }, [selectedRadioAnswer, ratingAnswer, scaleAnswer, textAnswer])

  const handleQuestionTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updated = { ...localQuestion, question: e.target.value }
    setLocalQuestion(updated)
    onChangeQuestion(updated)
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
    onChangeQuestion(updated)
  }

  const addAnswerOption = () => {
    const newAnswers = localQuestion.answers
      ? [...localQuestion.answers, '']
      : ['']
    const updated = { ...localQuestion, answers: newAnswers }
    setLocalQuestion(updated)
    onChangeQuestion(updated)
  }

  const removeAnswerOption = (index: number) => {
    if (!localQuestion.answers) return
    const newAnswers = [...localQuestion.answers]
    newAnswers.splice(index, 1)
    const updated = { ...localQuestion, answers: newAnswers }
    setLocalQuestion(updated)
    onChangeQuestion(updated)
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
        <FeedbackQuestionRating
          localQuestion={localQuestion}
          ratingAnswer={ratingAnswer}
          setRatingAnswer={setRatingAnswer}
          setLocalQuestion={setLocalQuestion}
          onChange={onChangeQuestion}
        />
      )}

      {localQuestion.type === 'radio' && localQuestion.answers && (
        <FeedbackQuestionRadio
          localQuestion={localQuestion}
          selectedRadioAnswer={selectedRadioAnswer}
          setSelectedRadioAnswer={setSelectedRadioAnswer}
          handleAnswersChange={handleAnswersChange}
          removeAnswerOption={removeAnswerOption}
          addAnswerOption={addAnswerOption}
        />
      )}

      {localQuestion.type === 'scale' && localQuestion.answers && (
        <FeedbackQuestionScale
          localQuestion={localQuestion}
          setLocalQuestion={setLocalQuestion}
          onChange={onChangeQuestion}
          scaleAnswer={scaleAnswer}
          setScaleAnswer={setScaleAnswer}
        />
      )}

      {localQuestion.type === 'text' && (
        <FeedbackQuestionText
          textAnswer={textAnswer}
          setTextAnswer={setTextAnswer}
        />
      )}

      <div className="lineDash"></div>
    </div>
  )
}
