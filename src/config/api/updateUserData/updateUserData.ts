import { currentUser } from '../../../fixtures'

import { Form, Response, Fail } from './schema'

export const updateUserData = (data: Form): Promise<Response> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        Form.parse(data)
      } catch (error) {
        reject(error as Fail)
      }

      currentUser.email = data.email
      currentUser.name = data.firstname
      currentUser.lastname = data.lastname
      resolve({
        success: 'User data has been updated',
      })
    }, 4000)
  })

export default updateUserData
