import { z } from 'zod'

export const ToastMessages = z.record(z.string())

export type ToastMessages = z.infer<typeof ToastMessages>
