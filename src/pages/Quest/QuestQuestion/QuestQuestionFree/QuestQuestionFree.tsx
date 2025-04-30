import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { QuestQuestionFree as QuestQuestionFreeInterface } from '../../../../models/questQuestion'
import Input from '../../../../components/UI/Input/Input'
import { toLower } from 'lodash'

export interface QuestQuestionFreeProps {
  isCheckMode: boolean
  question: QuestQuestionFreeInterface
  setIsAnswerReady: (isAnswerReady: boolean) => void
}

export const QuestQuestionFree = forwardRef(
  (
    { question, isCheckMode, setIsAnswerReady }: QuestQuestionFreeProps,
    ref,
  ) => {
    const [userAnswer, setUserAnswer] = useState<string>('')

    useImperativeHandle(
      ref,
      () => ({
        userAnswer,
        isCorrectAnswer:
          toLower(userAnswer).trim() ===
          toLower(question.answer.correctAnswer).trim(),
      }),
      [userAnswer],
    )
    useEffect(() => setIsAnswerReady(!!userAnswer.trim()), [userAnswer])

    return (
      <div>
        <Input
          value={userAnswer}
          disabled={isCheckMode}
          onChange={e => setUserAnswer(e.target.value)}
        />
      </div>
    )
  },
)
