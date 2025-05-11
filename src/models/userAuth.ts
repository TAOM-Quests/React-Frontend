import { ServerFile } from './serverFile'

export interface UserAuth {
  id: number
  name: string
  email: string
  token: string
  isAdmin?: boolean
  image?: ServerFile
  isEmployee?: boolean
}

export interface EmployeeAuth extends UserAuth {
  roleId: number
  position: string
  departmentId: number
}
