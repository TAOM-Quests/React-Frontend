import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { QuestQuestionFree as QuestQuestionFreeInterface } from '../../../../models/questQuestion'
import Input from '../../../../components/UI/Input/Input'
import { toLower } from 'lodash'
import './QuestQuestionFree.scss'
import classNames from 'classnames'
import { getColorAnswerFree } from '../questQuestionUtils'

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

    const checkAnswer = (
      userAnswer: string,
      correctAnswer: string,
    ): boolean => {
      return toLower(userAnswer).trim() === toLower(correctAnswer).trim()
    }

    useImperativeHandle(
      ref,
      () => ({
        userAnswer,
        isCorrectAnswer: checkAnswer(userAnswer, question.answer.correctAnswer),
      }),
      [userAnswer],
    )
    useEffect(() => setIsAnswerReady(!!userAnswer.trim()), [userAnswer])

    return (
      <div
        className={classNames(
          'quest-question-free',
          `quest-question-free--${getColorAnswerFree(isCheckMode, checkAnswer(userAnswer, question.answer.correctAnswer))}`,
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
