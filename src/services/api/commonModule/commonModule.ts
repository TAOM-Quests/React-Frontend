import { api } from '../api'

export const COMMON_MODULE_API_URL = 'commonModule/'

export const commonModule = <TResult, TParameters = null>(
  path: string,
  parameters?: TParameters,
): Promise<TResult> =>
  api(COMMON_MODULE_API_URL + path, parameters) as Promise<TResult>
