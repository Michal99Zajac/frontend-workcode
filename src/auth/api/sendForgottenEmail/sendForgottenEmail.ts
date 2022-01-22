import {
  ForgotPasswordResponseType,
  ForgotPasswordType,
} from '../../schemas/ForgotPasswordSchema'

export const sendForgottenEmail = (
  data: ForgotPasswordType
): Promise<ForgotPasswordResponseType> => {
  return new Promise<ForgotPasswordResponseType>((resolve, reject) => {
    setTimeout(() => {
      if (data.email === correctEmail) resolve({})

      reject({
        email: 'email is not in database',
      })
    }, 3000)
  })
}

export default sendForgottenEmail

const correctEmail = 'admin@example.com'
