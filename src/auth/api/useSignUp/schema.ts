import { z } from 'zod'

import { ApiError } from 'common/schemas'
import { AuthUser } from 'auth/schemas/AuthUser'

export const Form = z.object({
  email: z
    .string({
      required_error: 'email is required',
    })
    .email({ message: 'email shoud have email form' })
    .nonempty({ message: 'email is required' }),
  name: z
    .string({
      required_error: 'firstname is required',
    })
    .nonempty(),
  lastname: z
    .string({
      required_error: 'lastname is required',
    })
    .nonempty(),
  password: z
    .string({
      required_error: 'password is required',
    })
    .min(7, 'password has to have more then 6 letters')
    .nonempty({ message: 'password is required' }),
  repeatedPassword: z.string({
    required_error: 'Repeated password is required',
  }),
})

export const Response = AuthUser

export const ErrorResponse = ApiError

export type Form = z.infer<typeof Form>

export type Response = z.infer<typeof Response>

export type ErrorResponse = z.infer<typeof ErrorResponse>
