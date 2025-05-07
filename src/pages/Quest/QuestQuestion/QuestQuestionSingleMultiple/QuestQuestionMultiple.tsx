import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { QuestQuestionMultiple as QuestQuestionMultipleInterface } from '../../../../models/questQuestion'
import { isEqual } from 'lodash'
import './QuestQuestionMultiple.scss'
import { QuestQuestionButton } from '../QuestQuestionButton/QuestQuestionButton'
import { getOptionColorType } from '../questQuestionUtils'

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
          <QuestQuestionButton
            key={optionIndex}
            text={option}
            size="extraLarge"
            disabled={isCheckMode}
            colorType={getOptionColorType(
              optionIndex,
              question.answer.correctAnswer,
              userAnswer,
              isCheckMode,
            )}
            onClick={() => toggleOption(optionIndex)}
          />
        ))}
      </div>
    )
  },
)
