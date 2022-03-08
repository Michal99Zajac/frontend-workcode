/* eslint-disable @typescript-eslint/no-unused-vars */
import { Response, Fail, Form } from './schema'

export const deleteWorkspace = (form: Form) =>
  new Promise<Response>((resolve, reject) => {
    setTimeout(() => {
      resolve({
        success: 'Workspace has been deleted',
      })

      reject({
        error: 'Something went wrong',
      } as Fail)
    }, 2000)
  })

export default deleteWorkspace
