import { z } from 'zod'

import { _ID } from 'common/schemas'

export const Message = z.object({
  userId: _ID,
  message: z.string(),
  createdAt: z.string(),
})

export type Message = z.infer<typeof Message>
