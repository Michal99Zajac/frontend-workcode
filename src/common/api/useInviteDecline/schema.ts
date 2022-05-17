import { z } from 'zod'

import { ApiError } from 'common/schemas'

export const Response = z.object({
  message: z.string(),
})

export const ErrorResponse = ApiError

export type Response = z.infer<typeof Response>

export type ErrorResponse = z.infer<typeof ErrorResponse>
