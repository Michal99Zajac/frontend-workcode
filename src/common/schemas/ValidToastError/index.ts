import { z } from 'zod'

export const ValidToastError = z.record(z.string())

export type ValidToastErrorType = z.infer<typeof ValidToastError>
