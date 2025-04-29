import { useState } from 'react'
import { QuestQuestion as QuestQuestionInterface } from '../../../models/questQuestion'
import { Button } from '../../../components/UI/Button/Button'

export interface QuestQuestionProps {
  question: QuestQuestionInterface
  setNextQuestion: () => void
}

export const QuestQuestion = ({
  question,
  setNextQuestion,
}: QuestQuestionProps) => {
  const [isCheckMode, setIsCheckMode] = useState<boolean>(false)

  return (
    <div>
      <h2>{question.text}</h2>
      {!isCheckMode && (
        <Button text="Ответить" onClick={() => setIsCheckMode(true)} />
      )}
      {isCheckMode && <Button text="Далее" onClick={setNextQuestion} />}
    </div>
  )
}
