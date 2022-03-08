import { produce } from 'immer'
import { v4 } from 'uuid'

import { setUsers, users } from '../../../fixtures'

import { Form, Response, Fail } from './schema'

export const signup = (form: Form): Promise<Response> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      setUsers(
        produce(users, (draft) => {
          draft.push({
            id: v4(),
            email: form.email,
            lastname: form.lastname,
            firstname: form.firstname,
            src: null,
          })
        })
      )
      resolve({
        success: 'You are signed up!',
      })

      reject({
        email: 'email is required',
      } as Fail)
    }, 4000)
  })
}

export default signup
