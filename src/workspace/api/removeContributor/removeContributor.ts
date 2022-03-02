/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormType, ResponseType, FailType } from './schema'

export const removeContributor = (form: FormType): Promise<ResponseType> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.floor(10 * Math.random()) !== 0) {
        resolve({ success: 'Contributor has been removed' })
      } else {
        reject({ error: 'Something went wrong' } as FailType)
      }
    }, 1000)
  })

export default removeContributor
