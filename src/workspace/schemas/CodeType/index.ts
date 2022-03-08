import { z } from 'zod'

export const CodeType = z.enum(['JAVASCRIPT', 'PYTHON', 'BASH'])

export type CodeType = z.infer<typeof CodeType>
