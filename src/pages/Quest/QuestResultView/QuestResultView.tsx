import { QuestResult } from '../../../models/questResult'

export interface QuestResultViewProps {
  questionCount: number
  results: QuestResult[]
  userCorrectAnswerCount: number
}

export const QuestResultView = ({
  results,
  questionCount,
  userCorrectAnswerCount,
}: QuestResultViewProps) => {
  const sortedResults = results.sort((a, b) => b.minPoints - a.minPoints)
  const currentResult = sortedResults.find(
    result => result.minPoints <= userCorrectAnswerCount,
  )

  return (
    <div>
      <h1>{currentResult?.name}</h1>
      <div>
        {userCorrectAnswerCount}/{questionCount}
      </div>
      <p>{currentResult?.description}</p>
    </div>
  )
}
