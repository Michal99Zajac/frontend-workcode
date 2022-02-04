import { currentUser } from '../../../fixtures'

import { FormType, ResponseType, FailType, Form } from './schema'

export const updateUserData = (data: FormType): Promise<ResponseType> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        Form.parse(data)
      } catch (error) {
        reject(error as FailType)
      }

      currentUser.email = data.email
      currentUser.firstname = data.firstname
      currentUser.lastname = data.lastname
      resolve({
        success: 'User data has been updated',
      })
    }, 4000)
  })

export default updateUserData
