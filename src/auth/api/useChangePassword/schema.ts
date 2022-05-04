import { z } from 'zod'

import { User } from 'common/schemas'

export const Form = z.object({
  password: z.string({ required_error: 'password is required' }),
  repeatedPassword: z.string({
    required_error: 'Repeated password is required',
  }),
})

export const Response = User

export const ErrorResponse = z.object({
  message: z.record(z.string()),
})

export type Form = z.infer<typeof Form>

export type Response = z.infer<typeof Response>

export type ErrorResponse = z.infer<typeof ErrorResponse>
