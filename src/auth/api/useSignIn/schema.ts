import { z } from 'zod'

import { AuthUser, Token } from 'auth/schemas'

export const Form = z.object({
  email: z.string().email(),
  password: z.string(),
})

export const Response = z.object({
  user: AuthUser,
  token: Token,
  message: z.string(),
})

export const ErrorResponse = z.object({
  message: z.record(z.string()),
})

export type Form = z.infer<typeof Form>

export type Response = z.infer<typeof Response>

export type ErrorResponse = z.infer<typeof ErrorResponse>
