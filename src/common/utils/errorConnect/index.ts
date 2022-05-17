import { Error } from 'common/schemas'

export const errorConnect = (errors: Error) => {
  return Object.values(errors).join('\n')
}

export default errorConnect
