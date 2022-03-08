import { FormType, ResponseType, FailType } from './schema'

export const deleteAccount = (form: FormType): Promise<ResponseType> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (form.password !== 'password') {
        reject({
          password: 'Password is incorrect',
        } as FailType)
      }

      resolve({
        success: 'Account has been deleted',
      })
    }, 4000)
  })

export default deleteAccount
