import { z } from 'zod'

export const Form = z.object({
  password: z.string({ required_error: 'password is required' }),
})

export const Response = z.object({
  message: z.string(),
})

export const ErrorResponse = z.object({
  message: z.record(z.string()),
})

export type Form = z.infer<typeof Form>

export type Response = z.infer<typeof Response>

export type ErrorResponse = z.infer<typeof ErrorResponse>
