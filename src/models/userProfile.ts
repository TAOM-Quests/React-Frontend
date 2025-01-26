import { QuestMinimize } from './questMinimize'

export interface UserProfile {
  id: number
  name: string
  surname: string
  email: string
  department: string
  role: string
  completedQuests: QuestMinimize[]
}
