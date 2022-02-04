import { z } from 'zod'

import { AuthUser } from '../../../common/schemas'

export const Form = z.object({
  email: z
    .string({
      required_error: 'email is required',
    })
    .nonempty({ message: 'email is required' })
    .email({ message: 'email should have email form' }),
  password: z
    .string({
      required_error: 'password is required',
    })
    .nonempty({ message: 'password is required' })
    .min(7, 'password has to have more then 6 letters'),
})

export const Response = z.object({
  user: AuthUser,
  token: z.string().nonempty(),
})

export const Fail = z.object({
  email: z.string().optional(),
  password: z.string().optional(),
})

export type FormType = z.infer<typeof Form>

export type ResponseType = z.infer<typeof Response>

export type FailType = z.infer<typeof Fail>
