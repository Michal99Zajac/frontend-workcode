import {
  ChangePasswordType as ChangePasswordFormType,
  ChangePasswordResponseType,
} from '../../schemas/ChangePasswordSchema'

export const changePassword = (
  form: ChangePasswordFormType
): Promise<ChangePasswordResponseType> => {
  return new Promise<ChangePasswordResponseType>((resolve, reject) => {
    setTimeout(() => {
      console.log(form)
      resolve({
        success: 'Password has been changed',
      })

      reject({
        password: 'Password is too weak',
      })
    }, 4000)
  })
}

export default changePassword
