import { z } from 'zod'

export const _ID = z.string()

export type _ID = z.infer<typeof _ID>
