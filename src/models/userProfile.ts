import { QuestMinimize } from './questMinimize'

export interface UserProfile {
  id: number
  email: string
  firstName: string
  lastName: string
  patronymic: string
  birthDate: Date
  sex: string
  phone: string
  department: string
  role: string
  completedQuests: QuestMinimize[]
}
