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

export type FormType = z.infer<typeof Form>

export type ResponseType = z.infer<typeof Response>

export type FailType = z.infer<typeof Fail>
