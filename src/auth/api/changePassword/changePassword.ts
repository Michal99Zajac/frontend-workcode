/* eslint-disable @typescript-eslint/no-unused-vars */
import { Form, Response, Fail } from './schema'

export const changePassword = (data: Form): Promise<Response> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        success: 'Password has been changed',
      })

      reject({
        password: 'Password is too weak',
      } as Fail)
    }, 4000)
  })
}

export default changePassword
