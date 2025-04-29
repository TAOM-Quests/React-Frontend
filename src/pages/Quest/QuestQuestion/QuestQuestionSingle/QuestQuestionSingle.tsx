import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { QuestQuestionSingle as QuestQuestionSingleInterface } from '../../../../models/questQuestion'
import { Button } from '../../../../components/UI/Button/Button'

export interface QuestQuestionSingleProps {
  isCheckMode: boolean
  question: QuestQuestionSingleInterface
  setIsAnswerReady: (isAnswerReady: boolean) => void
}

export const QuestQuestionSingle = forwardRef(
  (
    { question, isCheckMode, setIsAnswerReady }: QuestQuestionSingleProps,
    ref,
  ) => {
    const [userAnswer, setUserAnswer] = useState<number | null>(null)

    useImperativeHandle(ref, () => ({ userAnswer }), [userAnswer])
    useEffect(() => setIsAnswerReady(userAnswer !== null), [userAnswer])

    const getOptionClassName = (optionIndex: number): string => {
      let className = 'option'

      if (isCheckMode) {
        if (optionIndex === question.answer.correctAnswer) {
          className += ' option--correct'
        } else if (optionIndex === userAnswer) {
          className += ' option--wrong'
        }
      } else {
        if (optionIndex === userAnswer) {
          className += ' option--active'
        }
      }

      return className
    }

    return (
      <div>
        {question.answer.options.map((option, optionIndex) => (
          <Button
            text={option}
            key={optionIndex}
            disabled={isCheckMode}
            colorType={'secondary'}
            onClick={() => setUserAnswer(optionIndex)}
            className={getOptionClassName(optionIndex)}
          />
        ))}
      </div>
    )
  },
)
