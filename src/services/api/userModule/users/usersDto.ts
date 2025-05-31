export interface ProfileGetDto {
  id: number
}

export interface ProfileUpdateDto {
  id: number
  sex?: string
  email?: string
  roleId?: number
  imageId?: number
  lastName?: string
  firstName?: string
  positionId?: number
  patronymic?: string
  phoneNumber?: string
  departmentId?: number
  birthDate?: string | null
}

export type UserEnterDto = UserEnter | string

export interface UsersGetDto {
  id?: number
  limit?: number
  offset?: number
  roleId?: number
  isAdmin?: boolean
  positionId?: number
  isEmployee?: boolean
  departmentId?: number
}

interface UserEnter {
  email: string
  password: string
}
