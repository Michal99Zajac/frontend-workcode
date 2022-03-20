/* eslint-disable @typescript-eslint/no-unused-vars */
import { users } from '../../../fixtures'

import { Form, Response, Fail } from './schema'

export const getContributors = (form: Form) =>
  new Promise<Response>((resolve, reject) => {
    setTimeout(() => {
      // reject({
      //   error: 'Something went wrong',
      // } as Fail)

      resolve({
        contributors: users.slice(2, 12),
      })
    }, 2000)
  })

export default getContributors
