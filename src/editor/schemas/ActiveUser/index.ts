import { z } from 'zod'

import { _ID } from 'common/schemas'

export const ActiveUser = z.object({
  _id: _ID,
  color: z.string(),
})

export type ActiveUser = z.infer<typeof ActiveUser>
