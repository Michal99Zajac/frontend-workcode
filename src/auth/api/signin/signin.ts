import { Permission } from '../../../permissions'

import { Form, Response } from './types'

export const signin = (form: Form): Promise<Response> => {
  return new Promise<Response>((resolve, reject) => {
    setTimeout(() => {
      if (
        form.email === correctUser.email &&
        form.password === correctUser.password
      ) {
        resolve({
          email: form.email,
          token: 'afafasbfjhjbejb',
          permissions: [Permission.USER],
        })
      }

      reject({
        email: 'email is required',
        password: 'password is too week',
      })
    }, 4000)
  })
}

export default signin

// TODO: remove after developing
const correctUser = {
  email: 'admin@example.com',
  password: 'P@ssword1',
}
