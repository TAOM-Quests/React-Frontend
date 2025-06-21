import { Department } from './department'
import { User } from './user'

export interface UserLeaderboardPosition {
  user: User
  rank: number
  experience: number
  department: Department
}
