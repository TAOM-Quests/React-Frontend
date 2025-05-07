import { useRef, useState } from 'react'
import {
  QuestQuestion as QuestQuestionInterface,
  QuestQuestionFree as QuestQuestionFreeInterface,
  QuestQuestionSingle as QuestQuestionSingleInterface,
  QuestQuestionMultiple as QuestQuestionMultipleInterface,
  QuestQuestionConnection as QuestQuestionConnectionInterface,
  QuestQuestionBoxSorting as QuestQuestionBoxSortingInterface,
} from '../../../models/questQuestion'
import { Button } from '../../../components/UI/Button/Button'
import { QuestQuestionSingle } from './QuestQuestionSingle/QuestQuestionSingle'
import { QuestQuestionMultiple } from './QuestQuestionSingleMultiple/QuestQuestionMultiple'
import { QuestQuestionConnection } from './QuestQuestionConnection/QuestQuestionConnection'
import { QuestQuestionBoxSorting } from './QuestQuestionBoxSorting/QuestQuestionBoxSorting'
import { QuestQuestionFree } from './QuestQuestionFree/QuestQuestionFree'
import './QuestQuestion.scss'

export type TypeAnswer = 'secondary' | 'activeAnswer' | 'correct' | 'wrong'

export interface QuestQuestionProps {
  question: QuestQuestionInterface
  setNextQuestion: (userAnswer: any, isCorrectAnswer: boolean) => void
}

export interface QuestQuestionRefData {
  userAnswer: any
  isCorrectAnswer: boolean
}

export const QuestQuestion = ({
  question,
  setNextQuestion,
}: QuestQuestionProps) => {
  const [isCheckMode, setIsCheckMode] = useState<boolean>(false)
  const [isAnswerReady, setIsAnswerReady] = useState<boolean>(false)

  const questionRef = useRef<QuestQuestionRefData>(null)

  const showNextQuestion = () => {
    setIsCheckMode(false)
    setIsAnswerReady(false)
    setNextQuestion(
      questionRef.current!.userAnswer,
      questionRef.current!.isCorrectAnswer,
    )
  }

  return (
    <div className="quest-question">
      <p className="body_xl_sb quest-question__title">{question.text}</p>
      {question.type === 'single' && (
        <QuestQuestionSingle
          ref={questionRef}
          isCheckMode={isCheckMode}
          setIsAnswerReady={setIsAnswerReady}
          question={question as QuestQuestionSingleInterface}
        />
      )}
      {question.type === 'multiple' && (
        <QuestQuestionMultiple
          ref={questionRef}
          isCheckMode={isCheckMode}
          setIsAnswerReady={setIsAnswerReady}
          question={question as QuestQuestionMultipleInterface}
        />
      )}
      {question.type === 'connection' && (
        <QuestQuestionConnection
          ref={questionRef}
          isCheckMode={isCheckMode}
          setIsAnswerReady={setIsAnswerReady}
          question={question as QuestQuestionConnectionInterface}
        />
      )}
      {question.type === 'boxSorting' && (
        <QuestQuestionBoxSorting
          ref={questionRef}
          isCheckMode={isCheckMode}
          setIsAnswerReady={setIsAnswerReady}
          question={question as QuestQuestionBoxSortingInterface}
        />
      )}
      {question.type === 'free' && (
        <QuestQuestionFree
          ref={questionRef}
          isCheckMode={isCheckMode}
          setIsAnswerReady={setIsAnswerReady}
          question={question as QuestQuestionFreeInterface}
        />
      )}
      {!isCheckMode && (
        <div>
          <Button
            text="Ответить"
            onClick={() => setIsCheckMode(true)}
            disabled={!isAnswerReady}
          />
        </div>
      )}
      {isCheckMode && (
        <div>
          <Button text="Далее" onClick={showNextQuestion} />
        </div>
      )}
    </div>
  )
}
