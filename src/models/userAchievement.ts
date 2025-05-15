import { ServerFile } from './serverFile'

export interface UserAchievement {
  name: string
  image: ServerFile
  experience: number
  description: string
  isReceived?: boolean
}
