import { FormType, ResponseType } from './schema'

export const sendForgottenEmail = (data: FormType): Promise<ResponseType> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.email === correctEmail)
        resolve({ success: 'Email has been sent' })

      reject({
        email: 'email is not in database',
      })
    }, 3000)
  })
}

export default sendForgottenEmail

const correctEmail = 'admin@example.com'
