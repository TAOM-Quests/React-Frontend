import { api } from '../api'

const COMMON_MODULE_API_URL = 'commonModule/'

export const commonModule = <TResult, TParameters = null>(
  path: string,
  parameters?: TParameters,
  fetchOptions?: RequestInit,
): Promise<TResult> =>
  api(
    COMMON_MODULE_API_URL + path,
    parameters,
    fetchOptions,
  ) as Promise<TResult>
