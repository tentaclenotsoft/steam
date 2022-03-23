interface IFetcherOptions {
  query?: { [key: string]: unknown }
  options?: { [key: string]: unknown }
}

const buildQuery = (object) =>
  object
    ? Object.entries(object)
        .map((parameter) => parameter.join('='))
        .join('&')
    : ''

export default (
  url: string,
  { query, options }: IFetcherOptions = { query: {}, options: {} }
) =>
  fetch(`${url}?${buildQuery(query)}`, options)
    .then((response) =>
      !response.ok ? Promise.reject(response.statusText) : response
    )
    .then((response) =>
      response.headers.get('Content-Type').startsWith('application/json')
        ? response.json()
        : response.text()
    )
