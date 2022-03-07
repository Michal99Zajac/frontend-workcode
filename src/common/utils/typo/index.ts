type Type =
  | 'bigint'
  | 'boolean'
  | 'function'
  | 'number'
  | 'object'
  | 'string'
  | 'symbol'
  | 'undefined'

export const typo = (type: Type, value: string | null) => {
  if (value === null) return null

  switch (type) {
    case 'boolean':
      return value === 'true'
    case 'number':
      return +value
    case 'string':
      return value
    case 'object':
      return JSON.parse(value)
    default:
      return value
  }
}

export default typo
