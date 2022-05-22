import { z } from 'zod'

export const Token = z.string()

export type Token = z.infer<typeof Token>
