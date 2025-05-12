import { QuestDifficult } from './questDifficult'
import { QuestGroup } from './questGroup'
import { QuestTag } from './questTag'

export interface QuestMinimize {
  id: number
  tags: QuestTag[]
  name?: string
  group?: QuestGroup
  difficult?: QuestDifficult
}
