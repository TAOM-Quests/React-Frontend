import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { QuestQuestionFree as QuestQuestionFreeInterface } from '../../../../models/questQuestion'
import Input from '../../../../components/UI/Input/Input'
import { toLower } from 'lodash'
import './QuestQuestionFree.scss'
import classNames from 'classnames'
import { TypeAnswer } from '../QuestQuestion'

export interface QuestQuestionFreeProps {
  question: QuestQuestionFreeInterface
  isCheckMode: boolean
  setIsAnswerReady: (isAnswerReady: boolean) => void
}

export const QuestQuestionFree = forwardRef(
  (
    { question, isCheckMode, setIsAnswerReady }: QuestQuestionFreeProps,
    ref,
  ) => {
    const [userAnswer, setUserAnswer] = useState<string>('')

    const isCorrect =
      toLower(userAnswer).trim() ===
      toLower(question.answer.correctAnswer).trim()
    const colorType: TypeAnswer = isCheckMode
      ? isCorrect
        ? 'correct'
        : 'wrong'
      : 'secondary'

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
      <div
        className={classNames(
          'quest-question-free',
          `quest-question-free--${colorType}`,
        )}
      >
        <Input
          value={userAnswer}
          disabled={isCheckMode}
          onChange={e => setUserAnswer(e.target.value)}
        />
      </div>
    )
  },
)
