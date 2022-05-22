import { z } from 'zod'

import { User } from 'common/schemas'

export const Response = User

export const ErrorResponse = z.object({
  message: z.record(z.string()),
})

export type Response = z.infer<typeof Response>

export type ErrorResponse = z.infer<typeof ErrorResponse>
