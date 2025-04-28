import { Department } from './department'
import { QuestDifficult } from './questDifficult'
import { QuestGroup } from './questGroup'
import { QuestQuestion } from './questQuestion'
import { QuestResult } from './questResult'
import { QuestTag } from './questTag'

export default interface Quest {
  id: number
  department: Department
  name?: string
  time?: string
  tags?: QuestTag[]
  group?: QuestGroup
  results?: QuestResult[]
  difficult: QuestDifficult
  questions?: QuestQuestion[]
}
