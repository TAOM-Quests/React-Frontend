import { api } from '../api'

const EVENT_MODULE_API_URL = 'eventModule/'

export const eventModule = <TResult, TParameters>(
  path: string,
  parameters?: TParameters,
  fetchOptions?: RequestInit,
): Promise<TResult> =>
  api(EVENT_MODULE_API_URL + path, parameters, fetchOptions) as Promise<TResult>
