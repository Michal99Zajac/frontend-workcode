import { z } from 'zod'

import { User, UUID } from '../../../common/schemas'

export const Message = z.object({
  id: UUID,
  author: User,
  date: z.date(),
  message: z.string(),
})

export type Message = z.infer<typeof Message>
