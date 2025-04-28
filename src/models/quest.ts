import { QuestQuestion } from './questQuestion'
import { QuestResult } from './questResult'

export default interface Quest {
  id: number
  name: string
  department: string
  group: string
  tags: string[]
  difficult: number
  results: QuestResult[]
  questions: QuestQuestion[]
}
