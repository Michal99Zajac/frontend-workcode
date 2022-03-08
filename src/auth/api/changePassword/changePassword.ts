import { FormType, ResponseType, FailType } from './schema'

export const changePassword = (data: FormType): Promise<ResponseType> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(data)
      resolve({
        success: 'Password has been changed',
      })

      reject({
        password: 'Password is too weak',
      } as FailType)
    }, 4000)
  })
}

export default changePassword
