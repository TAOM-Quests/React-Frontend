export interface Response {
  statusCode: number
  statusText: string
}

export interface ResponseError extends Response {
  message: string
}
