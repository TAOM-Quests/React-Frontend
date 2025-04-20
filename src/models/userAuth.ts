export interface UserAuth {
  id: number
  email: string
  token: string
  isAdmin?: boolean
  isEmployee?: boolean
  departmentId?: number
}
