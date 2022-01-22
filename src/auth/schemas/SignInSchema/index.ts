import { z } from 'zod'

import { PermissionArray } from '../../../permissions'

export const SignInSchema = z.object({
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

export const SignInResponseSchema = z.object({
  id: z.string().uuid().nonempty(),
  email: z.string().email().nonempty(),
  token: z.string().nonempty(),
  permissions: PermissionArray,
})

export const SignInErrorSchema = z.object({
  email: z.string().optional(),
  password: z.string().optional(),
})

export type SignInSchemaType = z.infer<typeof SignInSchema>

export type SignInResponseType = z.infer<typeof SignInResponseSchema>

export type SignInErrorType = z.infer<typeof SignInErrorSchema>
