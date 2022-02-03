import { z } from 'zod'

export const ToastMessages = z.record(z.string())

export type ToastMessagesType = z.infer<typeof ToastMessages>
