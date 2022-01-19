import { z } from 'zod'

import { PermissionArray } from '../../../permissions'

export const SignInSchema = z.object({
  email: z
    .string()
    .email({ message: 'email should have email form' })
    .nonempty({ message: 'email is required' }),
  password: z.string().min(7, 'password has to have more then 6 letters'),
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
