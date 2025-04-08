export interface UserAuth {
  id: number
  email: string
  token: string
  roleId?: number
  isAdmin?: boolean
  isEmployee?: boolean
  departmentId?: number
}
