import { Response, ResponseData, ResponseError } from "./common/interface/Response"

const DEV_SERVER_URL = 'http://localhost:3000/'
const BASE_API_URL = 'api/v1/'

export const api = async <TResult, TParameters>(
  path: string,
  parameters?: TParameters,
): Promise<TResult | string> => {
  path = `${DEV_SERVER_URL}${BASE_API_URL}${path}`

  const response = await fetchData<TParameters>(path, parameters) as Response

  console.log(response)

  if (response.statusCode >= 400) {
    const responseError = response as ResponseError

    throw new Error(responseError.message)
  }

  const responseData = response as ResponseData<TResult>

  return responseData.body
}

function fetchData<TParameters>(
  path: string,
  parameters?: TParameters
) {
  const request = parameters
  ? fetch(path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parameters),
    })
  : fetch(path)

  return request
    .then((response) => response.json())
}