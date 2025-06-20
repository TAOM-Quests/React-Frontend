import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { QuestQuestionSingle as QuestQuestionSingleInterface } from '../../../../models/questQuestion'
import './QuestQuestionSingle.scss'
import { QuestQuestionButton } from '../QuestQuestionButton/QuestQuestionButton'
import { getOptionColorType } from '../questQuestionUtils'

export interface QuestQuestionSingleProps {
  isCheckMode: boolean
  question: QuestQuestionSingleInterface
  setIsAnswerReady: (isAnswerReady: boolean) => void
  userAnswer?: number
}

export const QuestQuestionSingle = forwardRef(
  (
    {
      question,
      isCheckMode,
      setIsAnswerReady,
      userAnswer: userAnswerProp,
    }: QuestQuestionSingleProps,
    ref,
  ) => {
    const [userAnswer, setUserAnswer] = useState<number | null>(
      userAnswerProp ?? null,
    )

    useImperativeHandle(
      ref,
      () => ({
        userAnswer,
        isCorrectAnswer: userAnswer === question.answer.correctAnswer,
      }),
      [userAnswer],
    )
    useEffect(() => setIsAnswerReady(userAnswer !== null), [userAnswer])

    return (
      <div className="quest-question-single">
        {question.answer.options.map((option, optionIndex) => (
          <QuestQuestionButton
            key={optionIndex}
            text={option}
            image={question.answer.optionsImages[optionIndex]}
            disabled={isCheckMode}
            size="extraLarge"
            colorType={getOptionColorType(
              optionIndex,
              question.answer.correctAnswer,
              userAnswer,
              isCheckMode,
            )}
            onClick={() => setUserAnswer(optionIndex)}
          />
        ))}
      </div>
    )
  },
)
