class APIError extends Error {
  code: string
  statusCode: number

  constructor (code: string, message: string, statusCode?: number) {
    super(message)

    this.code = code
    this.statusCode = statusCode ?? 500
  }
}

export { APIError }
