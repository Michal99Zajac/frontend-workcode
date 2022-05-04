import { z } from 'zod'

export const Form = z.object({
  email: z.string({ required_error: 'email is required' }).email(),
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
