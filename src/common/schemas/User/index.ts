import { z } from 'zod'

export const User = z.object({
  email: z.string().email(),
  firstname: z.string(),
  lastname: z.string(),
  id: z.string().uuid(),
  src: z.string().nullable(), // src to profile image
})

export type User = z.infer<typeof User>
