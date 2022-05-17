import { z } from 'zod'

export const Error = z.record(z.string())

export type Error = z.infer<typeof Error>
