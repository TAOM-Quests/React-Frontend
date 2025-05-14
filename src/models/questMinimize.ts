import { QuestDifficult } from './questDifficult'
import { QuestGroup } from './questGroup'
import { QuestTag } from './questTag'
import { ServerFile } from './serverFile'

export interface QuestMinimize {
  id: number
  tags: QuestTag[]
  name?: string
  time?: string
  group?: QuestGroup
  image?: ServerFile
  completeId?: number
  description?: string
  completedCount?: number
  difficult?: QuestDifficult
}
