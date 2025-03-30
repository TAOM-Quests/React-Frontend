import { UserAuth } from '../../../../models/userAuth'
import { UserProfile } from '../../../../models/userProfile'
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
    userModule<UserProfile, ProfileGetDto>(`user/${params.id}/profile`),

  updateProfile: (params: ProfileUpdateDto): Promise<UserProfile> =>
    userModule<UserProfile, ProfileUpdateDto>(`user/profile`, params),
}
