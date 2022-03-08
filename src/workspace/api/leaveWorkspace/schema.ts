import { z } from 'zod'

export const Form = z.object({
  workspaceId: z.string().uuid(),
})

export const Response = z.object({
  success: z.string(),
})

export const Fail = z.object({
  error: z.string(),
})

export type Form = z.infer<typeof Form>

export type Response = z.infer<typeof Response>

export type Fail = z.infer<typeof Fail>
