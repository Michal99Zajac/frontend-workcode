import { z } from 'zod'

import { Workspace } from 'workspace/schemas'

export const Response = Workspace

export const ErrorResponse = z.object({
  message: z.record(z.string()),
})

export type Response = z.infer<typeof Response>

export type ErrorResponse = z.infer<typeof ErrorResponse>
