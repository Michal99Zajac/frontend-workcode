import { FormType, ResponseType } from './schema'

export const signup = (form: FormType): Promise<ResponseType> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(form)
      resolve({
        success: 'You are signed up!',
      })

      reject({
        email: 'email is required',
      })
    }, 4000)
  })
}

export default signup
