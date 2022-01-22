import { z } from 'zod'

export const ForgotPasswordSchema = z.object({
  email: z
    .string({
      required_error: 'email is required',
    })
    .nonempty({ message: 'email is required' })
    .email({ message: 'email should have email form' }),
})

export const ForgotPasswordResponse = z.object({})

export const ForgotPasswordError = z.object({
  email: z.string().optional(),
})

export type ForgotPasswordType = z.infer<typeof ForgotPasswordSchema>

export type ForgotPasswordResponseType = z.infer<typeof ForgotPasswordResponse>

export type ForgotPasswordErrorType = z.infer<typeof ForgotPasswordError>
