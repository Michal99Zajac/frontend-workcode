import { FormType, ResponseType, FailType, Form } from './schema'

export const updateUserData = (data: FormType): Promise<ResponseType> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        Form.parse(data)
      } catch (error) {
        console.log(error)
        reject(error as FailType)
      }

      resolve({
        success: 'User data has been updated',
      })
    }, 4000)
  })

export default updateUserData
