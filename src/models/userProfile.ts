import { Department } from './department'
import { QuestMinimize } from './questMinimize'
import { ServerFile } from './serverFile'
import { UserLevel } from './userLevel'
import { UserPosition } from './userPoistion'

export interface UserProfile {
  id: number
  sex: string
  email: string
  lastName: string
  image: ServerFile
  firstName: string
  patronymic: string
  phoneNumber: string
  birthDate: Date | null
  completedQuests: QuestMinimize[]
  level: UserLevel
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
