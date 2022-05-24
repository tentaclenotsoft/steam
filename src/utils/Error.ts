class APIError extends Error {
  code: string

  constructor (code, message) {
    super(message)

    this.code = code
  }
}

export { APIError }
