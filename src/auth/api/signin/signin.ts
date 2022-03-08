import { authUser } from '../../../fixtures'

import { Form, Response, Fail } from './schema'

export const signin = (data: Form): Promise<Response> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        data.email === correctUser.email &&
        data.password === correctUser.password
      ) {
        resolve({
          user: authUser,
          token: 'afafasbfjhjbejb',
        })
      }

      reject({
        email: 'email is required',
        password: 'password is too week',
      } as Fail)
    }, 1000)
  })
}

export default signin

// TODO: remove after developing
const correctUser = {
  email: 'admin@example.com',
  password: 'password',
}
