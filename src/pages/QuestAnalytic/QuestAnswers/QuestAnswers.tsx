import { useState } from 'react'
import { QuestAnalyticElementProps } from '../questAnalyticElementProps'
import { QuestAnalyticAnswerSingle } from './Single/Single'
import {
  QuestQuestionBoxSorting,
  QuestQuestionConnection,
  QuestQuestionMultiple,
  QuestQuestionSingle,
} from '../../../models/questQuestion'
import { QuestAnalyticAnswerMultiple } from './Mutiple/Multiple'
import { QuestAnalyticAnswerConnection } from './Connection/Connection'
import { QuestAnalyticAnswerBoxSorting } from './BoxSorting/BoxSorting'
import { Button } from '../../../components/UI/Button/Button'

export const QuestAnalyticAnswers = ({
  quest,
  questAnswers,
}: QuestAnalyticElementProps) => {
  const [questionIndex, setQuestionIndex] = useState<number | null>(null)

  return (
    <div>
      {quest.questions?.map((_, index) => (
        <Button
          key={index}
          text={`Задание ${index + 1}`}
          onClick={() => setQuestionIndex(index)}
        />
      ))}

      {questionIndex === null && <></>}

      {questionIndex !== null && (
        <>
          <h2>{quest.questions?.[questionIndex].text}</h2>
          {quest.questions?.[questionIndex].type === 'single' && (
            <QuestAnalyticAnswerSingle
              questAnswers={questAnswers}
              questionIndex={questionIndex}
              question={quest.questions[questionIndex] as QuestQuestionSingle}
            />
          )}
          {quest.questions?.[questionIndex].type === 'multiple' && (
            <QuestAnalyticAnswerMultiple
              questAnswers={questAnswers}
              questionIndex={questionIndex}
              question={quest.questions[questionIndex] as QuestQuestionMultiple}
            />
          )}
          {quest.questions?.[questionIndex].type === 'connection' && (
            <QuestAnalyticAnswerConnection
              questAnswers={questAnswers}
              questionIndex={questionIndex}
              question={
                quest.questions[questionIndex] as QuestQuestionConnection
              }
            />
          )}
          {quest.questions?.[questionIndex].type === 'boxSorting' && (
            <QuestAnalyticAnswerBoxSorting
              questAnswers={questAnswers}
              questionIndex={questionIndex}
              question={
                quest.questions[questionIndex] as QuestQuestionBoxSorting
              }
            />
          )}
        </>
      )}
    </div>
  )
}
