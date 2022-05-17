import { z } from 'zod'

import { ApiError } from 'common/schemas'

export const Form = z.object({
  email: z.string({ required_error: 'email is required' }).email(),
})

export const Response = z.object({
  message: z.string(),
})

export const ErrorResponse = ApiError

export type Form = z.infer<typeof Form>

export type Response = z.infer<typeof Response>

export type ErrorResponse = z.infer<typeof ErrorResponse>
