import { Form, Response, Fail } from './schema'

export const deleteAccount = (form: Form): Promise<Response> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (form.password !== 'password') {
        reject({
          password: 'Password is incorrect',
        } as Fail)
      }

      resolve({
        success: 'Account has been deleted',
      })
    }, 4000)
  })

export default deleteAccount
