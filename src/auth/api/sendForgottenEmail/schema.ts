import { z } from 'zod'

export const Form = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Email should have email form' }),
})

export const Response = z.object({
  success: z.string(),
})

export const Fail = z.object({
  email: z.string().optional(),
})

export type Form = z.infer<typeof Form>

export type Response = z.infer<typeof Response>

export type Fail = z.infer<typeof Fail>
