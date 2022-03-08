/* eslint-disable @typescript-eslint/no-unused-vars */
import { Response, Fail, Form } from './schema'

export const leaveWorkspace = (form: Form) =>
  new Promise<Response>((resolve, reject) => {
    setTimeout(() => {
      resolve({
        success: 'You left successfully',
      })

      reject({
        error: 'Something went wrong',
      } as Fail)
    }, 2000)
  })

export default leaveWorkspace
