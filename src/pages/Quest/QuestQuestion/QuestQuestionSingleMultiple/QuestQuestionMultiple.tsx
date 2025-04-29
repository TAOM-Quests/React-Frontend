import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { QuestQuestionMultiple as QuestQuestionMultipleInterface } from '../../../../models/questQuestion'
import { Button } from '../../../../components/UI/Button/Button'

export interface QuestQuestionMultipleProps {
  isCheckMode: boolean
  question: QuestQuestionMultipleInterface
  setIsAnswerReady: (isAnswerReady: boolean) => void
}

export const QuestQuestionMultiple = forwardRef(
  (
    { question, isCheckMode, setIsAnswerReady }: QuestQuestionMultipleProps,
    ref,
  ) => {
    const [userAnswer, setUserAnswer] = useState<number[]>([])

    useImperativeHandle(ref, () => ({ userAnswer }), [userAnswer])
    useEffect(() => setIsAnswerReady(userAnswer.length > 0), [userAnswer])

    const getOptionClassName = (optionIndex: number): string => {
      let className = 'option'

      if (isCheckMode) {
        if (question.answer.correctAnswer.includes(optionIndex)) {
          className += ' option--correct'
        } else if (userAnswer.includes(optionIndex)) {
          className += ' option--wrong'
        }
      } else {
        if (userAnswer.includes(optionIndex)) {
          className += ' option--active'
        }
      }

      return className
    }

    const toggleOption = (optionIndex: number) => {
      if (userAnswer.includes(optionIndex)) {
        setUserAnswer(userAnswer.filter(index => index !== optionIndex))
      } else {
        setUserAnswer([...userAnswer, optionIndex])
      }
    }

    return (
      <div>
        {question.answer.options.map((option, optionIndex) => (
          <Button
            text={option}
            key={optionIndex}
            disabled={isCheckMode}
            colorType={'secondary'}
            onClick={() => toggleOption(optionIndex)}
            className={getOptionClassName(optionIndex)}
          />
        ))}
      </div>
    )
  },
)
