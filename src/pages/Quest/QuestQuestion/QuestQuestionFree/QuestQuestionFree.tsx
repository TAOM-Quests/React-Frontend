import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { QuestQuestionFree as QuestQuestionFreeInterface } from '../../../../models/questQuestion'
import Input from '../../../../components/UI/Input/Input'

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

    useImperativeHandle(ref, () => ({ userAnswer }), [userAnswer])
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
