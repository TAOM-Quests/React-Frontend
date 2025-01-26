import { api } from '../api'

const USER_MODULE_API_URL = 'userModule/'

export const userModule = <TResult, TParameters>(
  path: string,
  parameters?: TParameters,
): Promise<TResult> => api(USER_MODULE_API_URL + path, parameters)
