import { z } from 'zod'

export const ChatStatus = z.enum(['NEW', 'READED'])

export type ChatStatus = z.infer<typeof ChatStatus>
