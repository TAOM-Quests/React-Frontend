import { ServerFile } from './serverFile'

export interface UserAuth {
  id: number
  email: string
  token: string
  name?: string
  isAdmin?: boolean
  image?: ServerFile
  isEmployee?: boolean
}

export interface EmployeeAuth extends UserAuth {
  departmentId: number
}
