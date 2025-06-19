import { QuestGroup } from '../../../models/questGroup'
import { QuestMinimize } from '../../../models/questMinimize'

export interface QuestHomeGroupProps {
  group: QuestGroup
  quests: QuestMinimize[]
}

export const QuestHomeGroup = ({ group, quests }: QuestHomeGroupProps) => {
  return (
    <div>
      <h1>{group.name}</h1>

      {quests.map((quest, index) => (
        <div key={index}>{quest.name}</div>
      ))}
    </div>
  )
}
