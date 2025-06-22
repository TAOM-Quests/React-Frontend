import { ServerFile } from './serverFile'

export interface UserAuth {
  id: number
  name: string
  email: string
  token: string
  image?: ServerFile
  isAdmin?: boolean
  isEmployee?: boolean
  isInspector?: boolean
  isGameMaster?: boolean
}

export interface EmployeeAuth extends UserAuth {
  position: string
  rolesIds: number[]
  departmentId: number
}
