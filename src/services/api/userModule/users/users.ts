import { Employee } from '../../../../models/user'
import { UserAuth } from '../../../../models/userAuth'
import { UserProfile, UserProfileUpdated } from '../../../../models/userProfile'
import { userModule } from '../userModule'
import { ProfileGetDto, ProfileUpdateDto, UserEnterDto } from './usersDto'

export const users = {
  auth: (params: UserEnterDto): Promise<UserAuth> =>
    typeof params === 'string'
      ? userModule<UserAuth, UserEnterDto>(`user/auth?token=${params}`)
      : userModule<UserAuth, UserEnterDto>('user/auth', params),

  create: (params: UserEnterDto): Promise<UserAuth> =>
    userModule<UserAuth, UserEnterDto>('users', params),

  getProfile: (params: ProfileGetDto): Promise<UserProfile> =>
    userModule<UserProfile, ProfileGetDto>(`users/${params.id}/profile`),

  updateProfile: (params: ProfileUpdateDto): Promise<UserProfileUpdated> => {
    const { id: _, ...updateProfile } = params

    return userModule<UserProfileUpdated, Omit<ProfileUpdateDto, 'id'>>(
      `users/${params.id}/profile`,
      updateProfile,
    )
  },

  getEmployees: (): Promise<Employee[]> =>
    userModule<Employee[], null>('users?isEmployee=true'),
}
