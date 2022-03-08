import { z } from 'zod'

export const Form = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'Email should be email' })
    .nonempty({ message: 'Email cant be empty' }),
  firstname: z
    .string({
      required_error: 'firstname is required',
    })
    .nonempty({ message: 'Firstname cant be empty' }),
  lastname: z
    .string({
      required_error: 'lastname is required',
    })
    .nonempty({ message: 'Lastname cant be empty' }),
})

export const Response = z.object({
  success: z.string(),
})

export const Fail = z.object({
  email: z.string().optional(),
  firstname: z.string().optional(),
  lastname: z.string().optional(),
})

export type Form = z.infer<typeof Form>

export type Response = z.infer<typeof Response>

export type Fail = z.infer<typeof Fail>
