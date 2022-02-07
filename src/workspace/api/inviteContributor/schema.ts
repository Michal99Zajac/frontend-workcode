import { z } from 'zod'

import { Id } from '../../../common/schemas'

export const Form = z.object({
  userId: Id,
  workspaceId: Id,
})

export const Response = z.object({
  success: z.string(),
})

export const Fail = z.object({
  error: z.string(),
})

export type FormType = z.infer<typeof Form>

export type ResponseType = z.infer<typeof Response>

export type FailType = z.infer<typeof Fail>
