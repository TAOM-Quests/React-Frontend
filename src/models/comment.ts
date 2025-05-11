import { Employee } from './user'

export interface Comment {
  text: string
  user: Employee
  id?: number
  createdAt?: Date
}
