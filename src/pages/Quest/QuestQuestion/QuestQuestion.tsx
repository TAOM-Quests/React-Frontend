import { useRef, useState } from 'react'
import {
  QuestQuestion as QuestQuestionInterface,
  QuestQuestionSingle as QuestQuestionSingleInterface,
} from '../../../models/questQuestion'
import { Button } from '../../../components/UI/Button/Button'
import { QuestQuestionSingle } from './QuestQuestionSingle/QuestQuestionSingle'

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
      {!isCheckMode && (
        <Button
          text="Ответить"
          onClick={() => setIsCheckMode(true)}
          disabled={!isAnswerReady}
        />
      )}
      {isCheckMode && (
        <Button
          text="Далее"
          onClick={() => setNextQuestion(questionRef.current!.userAnswer)}
        />
      )}
    </div>
  )
}
