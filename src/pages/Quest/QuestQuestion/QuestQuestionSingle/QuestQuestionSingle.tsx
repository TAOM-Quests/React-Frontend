import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { QuestQuestionSingle as QuestQuestionSingleInterface } from '../../../../models/questQuestion'
import { Button, TypeButton } from '../../../../components/UI/Button/Button'
import './QuestQuestionSingle.scss'

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

    useImperativeHandle(
      ref,
      () => ({
        userAnswer,
        isCorrectAnswer: userAnswer === question.answer.correctAnswer,
      }),
      [userAnswer],
    )
    useEffect(() => setIsAnswerReady(userAnswer !== null), [userAnswer])

    const getOptionColorType = (optionIndex: number): TypeButton => {
      let colorType: TypeButton = 'secondary'

      if (isCheckMode) {
        if (optionIndex === question.answer.correctAnswer) {
          colorType = 'correct'
        } else if (optionIndex === userAnswer) {
          colorType = 'wrong'
        }
      } else {
        if (optionIndex === userAnswer) {
          colorType = 'activeAnswer'
        }
      }

      return colorType
    }

    return (
      <div className="quest-question-single">
        {question.answer.options.map((option, optionIndex) => (
          <Button
            text={option}
            key={optionIndex}
            disabled={isCheckMode}
            size="extraLarge"
            onClick={() => setUserAnswer(optionIndex)}
            colorType={getOptionColorType(optionIndex)}
          />
        ))}
      </div>
    )
  },
)
