import { z } from 'zod'

export const Navigation = z.object({
  next: z.number().nullable(),
  previous: z.number().nullable(),
  last: z.number(),
  first: z.number(),
})

export type NavigationType = z.infer<typeof Navigation>
