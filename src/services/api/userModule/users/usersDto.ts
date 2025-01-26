export interface ProfileGetDto {
  id: number
}

export interface ProfileUpdateDto {
  name?: string
  surname?: string
  email?: string
}

export interface UserEnterDto {
  email: string
  password: string
}
