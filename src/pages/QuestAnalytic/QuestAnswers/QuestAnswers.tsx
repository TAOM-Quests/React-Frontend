import { useState } from 'react'
import { QuestAnalyticElementProps } from '../questAnalyticElementProps'

export const QuestAnalyticAnswers = ({
  quest,
  participants,
  questAnswers,
}: QuestAnalyticElementProps) => {
  const [currentQuestion, setCurrentQuestion] = useState<number | null>(null)

  return (
    <div>
      {quest.questions?.map((question, index) => (
        <div onClick={() => setCurrentQuestion(index)}>
          <p>{`Задание ${index + 1}`}</p>
          <p>{question.answer.text}</p>
        </div>
      ))}
    </div>
  )
}
