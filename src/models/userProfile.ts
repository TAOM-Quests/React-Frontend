import { Department } from './department'
import { QuestMinimize } from './questMinimize'
import { UserPosition } from './userPoistion'

export interface UserProfile {
  id: number
  email: string
  firstName: string
  lastName: string
  patronymic: string
  birthDate: Date | null
  sex: string
  phoneNumber: string
  completedQuests: QuestMinimize[]
}

export interface UserProfileEmployee extends UserProfile {
  position: UserPosition
  department: Department
}

export interface UserProfileUpdated {
  email: string
  firstName: string
  lastName: string
  patronymic: string
  birthDate: string | null
  sex: string
  phoneNumber: string
}
