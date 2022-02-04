import { users } from '../../../fixtures'

import { FormType, ResponseType } from './schema'

export const fetchUser = (form: FormType): Promise<ResponseType> => {
  return new Promise<ResponseType>((resolve) => {
    setTimeout(() => {
      const user = users.find((user) => user.id === form.id)
      resolve({ user: user || null })
    }, 1000)
  })
}

export default fetchUser
