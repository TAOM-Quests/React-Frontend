import { api } from '../api'

const QUEST_MODULE_API_URL = 'questModule/'

export const questModule = <TResult, TParameters>(
  path: string,
  parameters?: TParameters,
): Promise<TResult> =>
  api(QUEST_MODULE_API_URL + path, parameters) as Promise<TResult>
