export interface SendEmailConfirmCodeDto {
  email: string
}

export interface ConfirmEmailDto {
  code: number
  email: string
}

export interface ProfileGetDto {
  id: number
}

export interface ProfileUpdateDto {
  id: number
  sex?: string
  email?: string
  password?: string
  lastName?: string
  firstName?: string
  patronymic?: string
  phoneNumber?: string
  roleId?: number | null
  imageId?: number | null
  birthDate?: string | null
  positionId?: number | null
  departmentId?: number | null
}

export type UserEnterDto = UserEnter | string

export interface UsersGetDto {
  id?: number
  email?: string
  limit?: number
  offset?: number
  roleId?: number
  isAdmin?: boolean
  positionId?: number
  isEmployee?: boolean
  departmentId?: number
}

export interface UpdateUserNotificationsSettingsItemDto {
  userId: number
  typeId: number
  email?: boolean
  telegram?: boolean
}

interface UserEnter {
  email: string
  password: string
}
