import { SignUpResponseType, SignUpType } from '../../schemas/SignUpSchema'

export const signup = (form: SignUpType): Promise<SignUpResponseType> => {
  return new Promise<SignUpResponseType>((resolve, reject) => {
    setTimeout(() => {
      console.log(form)
      resolve({
        id: 'd04a84b7-b866-4b55-8d79-2f47edb07d13',
      })

      reject({
        email: 'email is required',
      })
    }, 4000)
  })
}

export default signup
