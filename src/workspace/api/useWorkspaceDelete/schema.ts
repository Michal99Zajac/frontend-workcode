import { z } from 'zod'

export const Response = z.object({
  message: z.string(),
})

export const ErrorResponse = z.object({
  message: z.string(),
})

export type Response = z.infer<typeof Response>

export type ErrorResponse = z.infer<typeof ErrorResponse>
