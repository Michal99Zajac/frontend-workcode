import { authUser } from '../../../fixtures'

import { FormType, ResponseType } from './schema'

export const signin = (data: FormType): Promise<ResponseType> => {
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
      })
    }, 1000)
  })
}

export default signin

// TODO: remove after developing
const correctUser = {
  email: 'admin@example.com',
  password: 'password',
}
