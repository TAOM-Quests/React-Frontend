import { api } from '../api'

const GAMES_MODULE_API_URL = 'games/'

export const gamesModule = <TResult, TParameters>(
  path: string,
  parameters?: TParameters,
): Promise<TResult> =>
  api(GAMES_MODULE_API_URL + path, parameters) as Promise<TResult>
