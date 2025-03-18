export interface UserAuth {
  id: number
  email: string
  token: string
  roleId: number
  departmentId?: number
  isAdmin?: boolean
}
