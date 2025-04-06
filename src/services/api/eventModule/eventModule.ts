import { api } from '../api'

const EVENT_MODULE_API_URL = 'eventModule/'

export const eventModule = <TResult, TParameters>(
  path: string,
  parameters?: TParameters,
): Promise<TResult> =>
  api(EVENT_MODULE_API_URL + path, parameters) as Promise<TResult>
