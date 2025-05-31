import { api } from '../api'

const QUEST_MODULE_API_URL = 'questModule/'

export const questModule = <TResult, TParameters>(
  path: string,
  parameters?: TParameters,
  fetchOptions?: RequestInit,
): Promise<TResult> =>
  api(QUEST_MODULE_API_URL + path, parameters, fetchOptions) as Promise<TResult>
