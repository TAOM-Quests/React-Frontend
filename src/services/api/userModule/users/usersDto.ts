export interface ProfileGetDto {
  id: number
}

export interface ProfileUpdateDto {
  id: number
  email?: string
  firstName?: string
  lastName?: string
  patronymic?: string
  birthDate?: string | null
  sex?: string
  phone?: string
}

export type UserEnterDto = UserEnter | string

interface UserEnter {
  email: string
  password: string
}
