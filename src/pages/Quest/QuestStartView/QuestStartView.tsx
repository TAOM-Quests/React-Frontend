import { Badge } from '../../../components/UI/Badge/Badge'
import { Button } from '../../../components/UI/Button/Button'

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
    <>
      {tags.map((tag, index) => (
        <Badge key={index} text={tag} />
      ))}
      {difficulty && <Badge text={difficulty} />}
      {time && <Badge text={`Время прохождения: ${time}`} />}
      <Badge text={`Количество заданий: ${questionCount}`} />
      <h1>{name}</h1>
      <p>{description}</p>
      <Button text="Пройти квест" onClick={onClickStartButton} />
    </>
  )
}
