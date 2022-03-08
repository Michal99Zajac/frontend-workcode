import { Form, Response, Fail } from './schema'

export const sendForgottenEmail = (data: Form): Promise<Response> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.email === correctEmail)
        resolve({ success: 'Email has been sent' })

      reject({
        email: 'email is not in database',
      } as Fail)
    }, 3000)
  })
}

export default sendForgottenEmail

const correctEmail = 'admin@example.com'
