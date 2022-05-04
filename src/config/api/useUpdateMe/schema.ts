import { z } from 'zod'

import { User } from 'common/schemas'

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
})

export const Response = User

export const ErrorResponse = z.object({
  message: z.record(z.string()),
})

export type Form = z.infer<typeof Form>

export type Response = z.infer<typeof Response>

export type ErrorResponse = z.infer<typeof ErrorResponse>
