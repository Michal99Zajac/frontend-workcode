import { z } from 'zod'

export const Id = z.string().uuid()

export type IdType = z.infer<typeof Id>
