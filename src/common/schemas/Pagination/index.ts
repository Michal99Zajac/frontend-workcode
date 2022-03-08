import { z } from 'zod'

export const Pagination = z.enum(['5', '10', '25', '50', '100'])

export type Pagination = z.infer<typeof Pagination>
