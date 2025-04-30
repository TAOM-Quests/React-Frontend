import { useRef, useState } from 'react'
import {
  QuestQuestion as QuestQuestionInterface,
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

export interface QuestQuestionProps {
  setNextQuestion: (userAnswer: any) => void
  question: QuestQuestionInterface
}

export interface QuestQuestionRefData {
  userAnswer: any
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
    setNextQuestion(questionRef.current!.userAnswer)
  }

  return (
    <div>
      <h2>{question.text}</h2>
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
      {!isCheckMode && (
        <Button
          text="Ответить"
          onClick={() => setIsCheckMode(true)}
          disabled={!isAnswerReady}
        />
      )}
      {isCheckMode && <Button text="Далее" onClick={showNextQuestion} />}
    </div>
  )
}
