export interface ProfileGetDto {
  id: number
}

export interface ProfileUpdateDto {
  id: number
  sex?: string
  email?: string
  imageId?: number
  lastName?: string
  firstName?: string
  patronymic?: string
  phoneNumber?: string
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
