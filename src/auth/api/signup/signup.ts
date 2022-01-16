import validator from 'validator'

import { Form, Response, FormError } from './types'

export const signup = (form: Form): Promise<Response> => {
  return new Promise<Response>((resolve, reject) => {
    setTimeout(() => {
      const err: FormError = {}

      if (!form.email || validator.isEmail(form.email))
        err.email = 'email is not email'

      if (!form.firstname) err.firstname = 'firstname is required'

      if (!form.lastname) err.lastname = 'lastname is required'

      if (!form.password || validator.isStrongPassword(form.password))
        err.password = 'password is to weak'

      if (Object.keys(err).length) {
        resolve({
          id: 'adafaabfabbfabhfba',
        })
      }

      reject(err)
    }, 4000)
  })
}

export default signup
