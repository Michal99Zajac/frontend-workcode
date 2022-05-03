import { z } from 'zod'

import { _ID } from 'common/schemas/_ID'

export const User = z.object({
  _id: _ID,
  email: z.string().email(),
  firstname: z.string(),
  lastname: z.string(),
  src: z.string().nullable(), // src to profile image
})

export type User = z.infer<typeof User>
