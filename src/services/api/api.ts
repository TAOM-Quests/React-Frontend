import { Response, ResponseError } from './common/interface/Response'

const SERVER_URL = import.meta.env.VITE_API_URL
const BASE_API_URL = 'api/v1/'

export const api = async <TResult, TParameters>(
  path: string,
  parameters?: TParameters,
  fetchOptions?: RequestInit,
): Promise<TResult | string> => {
  path = `${SERVER_URL}${BASE_API_URL}${path}`

  const response = (await fetchData<TParameters>(
    path,
    parameters,
    fetchOptions,
  )) as Response

  if (response.statusCode >= 400) {
    const responseError = response as ResponseError

    throw new Error(`${responseError.statusCode} - ${responseError.message}`)
  }

  const responseData = response as TResult

  return responseData
}

function fetchData<TParameters>(
  path: string,
  parameters?: TParameters | RequestInit,
  fetchOptions?: RequestInit,
) {
  const request =
    parameters || fetchOptions
      ? fetch(
          path,
          fetchOptions ?? {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(parameters),
          },
        )
      : fetch(path)

  return request.then(response =>
    response.json().catch(() => ({ statusCode: response.status })),
  )
}
