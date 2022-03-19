/* eslint-disable @typescript-eslint/no-unused-vars */
import { users } from '../../../fixtures'

import { Form, Response } from './schema'

export const getContributors = (form: Form) =>
  new Promise<Response>((resolve, reject) => {
    setTimeout(() => {
      resolve({
        contributors: users.slice(2, 12),
      })
    }, 2000)
  })

export default getContributors
