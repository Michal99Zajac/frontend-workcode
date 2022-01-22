import { z } from 'zod'

export const ChangePasswordSchema = z.object({
  password: z
    .string({
      required_error: 'password is required',
    })
    .min(7, 'password has to have more then 6 letters')
    .nonempty({ message: 'password is required' }),
  repeatedPassword: z.string().optional(),
})

export const ChangePasswordResponse = z.object({
  success: z.string(),
})

export const ChangePasswordError = z.object({
  password: z.string(),
})

export type ChangePasswordType = z.infer<typeof ChangePasswordSchema>

export type ChangePasswordResponseType = z.infer<typeof ChangePasswordResponse>

export type ChangePasswordErrorType = z.infer<typeof ChangePasswordError>
