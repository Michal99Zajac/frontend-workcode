import { z } from 'zod'

import { UUID } from '../../../common/schemas'

export const Form = z.object({
  message: z.string(),
  timestamp: z.date(),
  author: UUID,
})

export const Response = z.object({
  messageId: UUID,
})

export const Fail = z.object({
  error: z.string(),
})

export type Form = z.infer<typeof Form>

export type Response = z.infer<typeof Response>

export type Fail = z.infer<typeof Fail>
