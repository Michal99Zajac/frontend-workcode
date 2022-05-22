import { z } from 'zod'

export const Form = z.object({
  message: z.string(),
})

export type Form = z.infer<typeof Form>
