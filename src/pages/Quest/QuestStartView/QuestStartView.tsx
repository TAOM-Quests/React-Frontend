import { Button } from '../../../components/UI/Button/Button'
import { Tag } from '../../../components/UI/Tag/Tag'
import './QuestStartView.scss'

export interface QuestStartViewProps {
  name: string
  tags: string[]
  description: string
  questionCount: number
  onClickStartButton: () => void
  time?: string
  difficulty?: string
}

export const QuestStartView = ({
  name,
  time,
  tags,
  difficulty,
  description,
  questionCount,
  onClickStartButton,
}: QuestStartViewProps) => {
  return (
    <div className="quest-start">
      <div className="quest__tags">
        {tags.map((tag, index) => (
          <Tag key={index} text={tag} type="secondary" size="small" />
        ))}

        {difficulty && <Tag text={difficulty} type="subdued" size="small" />}
        {time && <Tag text={`Таймер ${time}`} type="subdued" size="small" />}
        <Tag text={`${questionCount} заданий`} type="subdued" size="small" />
      </div>
      <div className="quest-start__title">
        <h1 className="heading_1">{name}</h1>
      </div>
      <div className="quest-start__desc">
        <p
          dangerouslySetInnerHTML={{ __html: description }}
          className="body_xl_sb"
        ></p>
      </div>
      <div>
        <Button text="Пройти квест" onClick={onClickStartButton} />
      </div>
    </div>
  )
}
