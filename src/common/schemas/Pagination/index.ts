import { z } from 'zod'

export const Pagination = z.object({
  next: z.number(),
  previous: z.number(),
  first: z.number(),
  last: z.number(),
  count: z.number(),
})

export type Pagination = z.infer<typeof Pagination>
