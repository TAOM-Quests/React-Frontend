export interface Response {
  statusCode: number,
  statusText: string
}

export interface ResponseData<T>
extends Response {
  body: T
}

export interface ResponseError
extends Response {
  message: string
}