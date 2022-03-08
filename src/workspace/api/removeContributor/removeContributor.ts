/* eslint-disable @typescript-eslint/no-unused-vars */
import { Form, Response, Fail } from './schema'

export const removeContributor = (form: Form): Promise<Response> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.floor(10 * Math.random()) !== 0) {
        resolve({ success: 'Contributor has been removed' })
      } else {
        reject({ error: 'Something went wrong' } as Fail)
      }
    }, 1000)
  })

export default removeContributor
