import { Employee, User } from '../../../../models/user'
import { UserAuth } from '../../../../models/userAuth'
import { UserNotificationsSettingsItem } from '../../../../models/userNotificationsSettings'
import { UserPosition } from '../../../../models/userPoistion'
import { UserProfile, UserProfileUpdated } from '../../../../models/userProfile'
import { UserRole } from '../../../../models/userRole'
import { userModule } from '../userModule'
import {
  ProfileGetDto,
  ProfileUpdateDto,
  UpdateUserNotificationsSettingsItemDto,
  UserEnterDto,
  UsersGetDto,
} from './usersDto'

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

  updateNotificationsSettings: (
    params: UpdateUserNotificationsSettingsItemDto,
  ): Promise<UserNotificationsSettingsItem[]> =>
    userModule<
      UserNotificationsSettingsItem[],
      UpdateUserNotificationsSettingsItemDto
    >(`users/${params.userId}/notifications/settings`, params),

  getUsers: (params: UsersGetDto): Promise<User[]> => {
    const queryString = Object.entries(params)
      .map(([key, value]) => `${key}=${value}`)
      .join('&')

    return userModule<User[], null>(`users?${queryString}`)
  },

  getEmployees: (): Promise<Employee[]> =>
    userModule<Employee[], null>('users?isEmployee=true'),

  getRoles: (): Promise<UserRole[]> => userModule<UserRole[], null>('roles'),

  getPositions: (): Promise<UserPosition[]> =>
    userModule<UserRole[], null>('positions'),

  changePassword: (params: {
    oldPassword: string
    newPassword: string
  }): Promise<void> =>
    userModule<void, { oldPassword: string; newPassword: string }>(
      'users/change-password',
      params,
    ),
}
