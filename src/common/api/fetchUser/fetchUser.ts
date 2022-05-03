import { users } from '../../../fixtures'

import { Form, Response } from './schema'

export const fetchUser = (form: Form): Promise<Response> => {
  return new Promise<Response>((resolve) => {
    setTimeout(() => {
      const user = users.find((user) => user._id === form.id)
      resolve({ user: user || null })
    }, 1000)
  })
}

export default fetchUser
