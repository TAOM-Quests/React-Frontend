export interface UserAuth {
  id: number
  email: string
  token: string
  roleId?: number
  isAdmin?: boolean
  departmentId?: number
}
