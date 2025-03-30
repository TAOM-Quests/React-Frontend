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
  completedQuests: QuestMinimize[]
}

export interface UserProfileEmployee extends UserProfile {
  position: string
  department: string
}