import { Department } from './department'
import { QuestMinimize } from './questMinimize'
import { ServerFile } from './serverFile'
import { UserAchievement } from './userAchievement'
import { UserLevel } from './userLevel'
import { UserNotificationsSettingsItem } from './userNotificationsSettings'
import { UserPosition } from './userPoistion'
import { UserRole } from './userRole'

export interface UserProfile {
  id: number
  sex: string
  email: string
  lastName: string
  level: UserLevel
  image: ServerFile
  firstName: string
  patronymic: string
  phoneNumber: string
  birthDate: Date | null
  achievements: UserAchievement[]
  completedQuests: QuestMinimize[]
  notificationsSettings: UserNotificationsSettingsItem[]
  role?: UserRole
  department?: Department
  position?: UserPosition
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
