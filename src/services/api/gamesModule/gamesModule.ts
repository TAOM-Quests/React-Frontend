import { api } from '../api'

const GAMES_MODULE_API_URL = 'games/'

export const gamesModule = <TResult, TParameters>(
  path: string,
  parameters?: TParameters,
  fetchOptions?: RequestInit,
): Promise<TResult> =>
  api(GAMES_MODULE_API_URL + path, parameters, fetchOptions) as Promise<TResult>
