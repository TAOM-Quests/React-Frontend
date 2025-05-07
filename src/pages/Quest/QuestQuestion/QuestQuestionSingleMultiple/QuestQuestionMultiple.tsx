import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { QuestQuestionMultiple as QuestQuestionMultipleInterface } from '../../../../models/questQuestion'
import { Button, TypeButton } from '../../../../components/UI/Button/Button'
import { isEqual } from 'lodash'
import './QuestQuestionMultiple.scss'

export interface QuestQuestionMultipleProps {
  question: QuestQuestionMultipleInterface
  isCheckMode: boolean
  setIsAnswerReady: (isAnswerReady: boolean) => void
}

export const QuestQuestionMultiple = forwardRef(
  (
    { question, isCheckMode, setIsAnswerReady }: QuestQuestionMultipleProps,
    ref,
  ) => {
    const [userAnswer, setUserAnswer] = useState<number[]>([])

    useImperativeHandle(
      ref,
      () => ({
        userAnswer,
        isCorrectAnswer: isEqual(userAnswer, question.answer.correctAnswer),
      }),
      [userAnswer],
    )
    useEffect(() => setIsAnswerReady(userAnswer.length > 0), [userAnswer])

    const getOptionColorType = (optionIndex: number): TypeButton => {
      let colorType: TypeButton = 'secondary'

      if (isCheckMode) {
        if (question.answer.correctAnswer.includes(optionIndex)) {
          colorType = 'correct'
        } else if (userAnswer.includes(optionIndex)) {
          colorType = 'wrong'
        }
      } else {
        if (userAnswer.includes(optionIndex)) {
          colorType = 'activeAnswer'
        }
      }

      return colorType
    }

    const toggleOption = (optionIndex: number) => {
      if (userAnswer.includes(optionIndex)) {
        setUserAnswer(userAnswer.filter(index => index !== optionIndex))
      } else {
        setUserAnswer([...userAnswer, optionIndex])
      }
    }

    return (
      <div className="quest-question-multiple">
        {question.answer.options.map((option, optionIndex) => (
          <Button
            text={option}
            key={optionIndex}
            disabled={isCheckMode}
            colorType={getOptionColorType(optionIndex)}
            size="extraLarge"
            onClick={() => toggleOption(optionIndex)}
          />
        ))}
      </div>
    )
  },
)
