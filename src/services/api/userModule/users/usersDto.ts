export interface ProfileGetDto {
  id: number
}

export interface ProfileUpdateDto {
  name?: string
  surname?: string
  email?: string
}

export type UserEnterDto = UserEnter | string

interface UserEnter {
  email: string
  password: string
}
