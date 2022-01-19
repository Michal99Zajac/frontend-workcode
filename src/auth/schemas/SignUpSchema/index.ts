import { z } from 'zod'

export const SignUpSchema = z.object({
  email: z
    .string()
    .email({ message: 'email shoud have email form' })
    .nonempty({ message: 'email is required' }),
  firstname: z.string().nonempty(),
  lastname: z.string().nonempty(),
  password: z
    .string()
    .min(7, 'password has to have more then 6 letters')
    .nonempty({ message: 'password is required' }),
  repeatedPassword: z.string().optional(),
})

export const SignUpResponseSchema = z.object({
  id: z.string().uuid().nonempty(),
})

export const SignUpErrorSchema = z.object({
  email: z.string().optional(),
  firstname: z.string().optional(),
  lastname: z.string().optional(),
  password: z.string().optional(),
})

export type SignUpType = z.infer<typeof SignUpSchema>

export type SignUpResponseType = z.infer<typeof SignUpResponseSchema>

export type SignUpErrorType = z.infer<typeof SignUpErrorSchema>
