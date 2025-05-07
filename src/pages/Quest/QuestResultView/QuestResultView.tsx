import { Button } from '../../../components/UI/Button/Button'
import { Tag } from '../../../components/UI/Tag/Tag'
import { QuestResult } from '../../../models/questResult'
import './QuestResultView.scss'

export interface QuestResultViewProps {
  questionCount: number
  tags: string[]
  results: QuestResult[]
  userCorrectAnswerCount: number
  time?: string
  difficulty?: string
}

export const QuestResultView = ({
  tags,
  time,
  results,
  difficulty,
  questionCount,
  userCorrectAnswerCount,
}: QuestResultViewProps) => {
  const sortedResults = results.sort((a, b) => b.minPoints - a.minPoints)
  const currentResult = sortedResults.find(
    result => result.minPoints <= userCorrectAnswerCount,
  )

  return (
    <div className="quest-result">
      <div className="quest__tags">
        {tags.map((tag, index) => (
          <Tag key={index} text={tag} type="secondary" size="small" />
        ))}

        {difficulty && <Tag text={difficulty} type="subdued" size="small" />}
        {time && <Tag text={`Таймер ${time}`} type="subdued" size="small" />}
        <Tag text={`${questionCount} заданий`} type="subdued" size="small" />
      </div>
      <h1 className="heading_3">{currentResult?.name}</h1>
      <div className="heading_1">
        {userCorrectAnswerCount}/{questionCount}
      </div>
      <p
        dangerouslySetInnerHTML={{ __html: currentResult?.description ?? '' }}
        className="body_xl_sb"
      />
      <div className="quest-result__buttons">
        <Button text="Пройти ещё раз" colorType="secondary" />
        <Button text="Оставить отзыв" colorType="accent" />
      </div>
    </div>
  )
}
