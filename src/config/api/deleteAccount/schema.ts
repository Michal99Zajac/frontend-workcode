import { z } from 'zod'

export const Form = z.object({
  password: z
    .string({ required_error: 'password is required' })
    .nonempty({ message: 'Password is required' }),
})

export const Response = z.object({
  success: z.string(),
})

export const Fail = z.object({
  password: z.string(),
})

export type Form = z.infer<typeof Form>

export type Response = z.infer<typeof Response>

export type Fail = z.infer<typeof Fail>
