export const makeQuery = (form: Record<string, any>): string => {
  const query: Record<string, string> = {}

  for (const [key, value] of Object.entries(form)) {
    if (typeof value === 'string' && value !== '') {
      query[key] = value
    }

    if (typeof value === 'number') {
      query[key] = value.toString()
    }

    if (typeof value === 'boolean') {
      query[key] = value ? 'true' : 'false'
    }
  }

  if (Object.keys(query).length === 0) return ''

  const urlQuery = new URLSearchParams(query)
  return '?' + urlQuery.toString()
}

export default makeQuery
