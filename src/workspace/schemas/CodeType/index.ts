import { z } from 'zod'

export const CodeType = z.enum(['JAVASCRIPT', 'PYTHON', 'BASH'])

export type CodeTypeType = z.infer<typeof CodeType>
