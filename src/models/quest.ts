import { Department } from './department'
import { QuestDifficult } from './questDifficult'
import { QuestGroup } from './questGroup'
import { QuestQuestion } from './questQuestion'
import { QuestResult } from './questResult'
import { QuestTag } from './questTag'
import { ServerFile } from './serverFile'
import { User } from './user'

export interface Quest {
  id: number
  department: Department
  name?: string
  time?: string
  tags?: QuestTag[]
  group?: QuestGroup
  image?: ServerFile
  description?: string
  results?: QuestResult[]
  difficult: QuestDifficult
  questions?: QuestQuestion[]
}

export interface QuestComplete extends Quest {
  user: User
  date: Date
}
