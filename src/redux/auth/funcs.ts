import { UserAuth } from '../../models/userAuth'
import { users } from '../../services/api/userModule/users/users'

export const getUserByToken = async (): Promise<UserAuth | null> => {
  const token = localStorage.getItem('token')

  if (!token) {
    return null
  }

  try {
    return await users.auth(token)
  } catch (e) {
    console.log(`[Auth] ${e}`)

    if (+(e as Error).message.split(' - ')[0] === 404) {
      localStorage.removeItem('token')
    }

    return null
  }
}
