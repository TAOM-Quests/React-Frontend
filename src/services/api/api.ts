const BASE_API_URL = 'api/v1/'

export const api = <TResult, TParameters>(path: string, parameters?: TParameters): Promise<TResult> => {
    path = `${BASE_API_URL}${path}`

    return parameters
        ? fetch(path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(parameters),
        }) as Promise<TResult>
        : fetch(path) as Promise<TResult>
}