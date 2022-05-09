import { z } from 'zod'

import { _ID } from 'common/schemas'

export const Form = z.object({
  _id: _ID,
})

export const Response = z.object({
  _id: _ID,
  guest: _ID,
  workspace: _ID,
  createdAt: z.string(),
})

export const ErrorResponse = z.object({
  message: z.record(z.string()),
})

export type Form = z.infer<typeof Form>

export type Response = z.infer<typeof Response>

export type ErrorResponse = z.infer<typeof ErrorResponse>
