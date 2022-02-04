import { z } from 'zod'

import { User } from '../../schemas/User'

export const Form = z.object({
  id: z.string().uuid(),
})

export const Response = z.object({
  user: User.nullable(),
})

export type ResponseType = z.infer<typeof Response>

export type FormType = z.infer<typeof Form>
