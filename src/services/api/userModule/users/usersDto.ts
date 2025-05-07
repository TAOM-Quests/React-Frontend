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

interface UserEnter {
  email: string
  password: string
}
