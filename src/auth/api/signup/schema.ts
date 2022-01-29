import { z } from 'zod'

export const Form = z.object({
  email: z
    .string({
      required_error: 'email is required',
    })
    .email({ message: 'email shoud have email form' })
    .nonempty({ message: 'email is required' }),
  firstname: z
    .string({
      required_error: 'firstname is required',
    })
    .nonempty(),
  lastname: z
    .string({
      required_error: 'lastname is required',
    })
    .nonempty(),
  password: z
    .string({
      required_error: 'password is required',
    })
    .min(7, 'password has to have more then 6 letters')
    .nonempty({ message: 'password is required' }),
  repeatedPassword: z.string({
    required_error: 'Repeated password is required',
  }),
})

export const Response = z.object({
  success: z.string(),
})

export const Fail = z
  .object({
    email: z.string(),
    firstname: z.string(),
    lastname: z.string(),
    password: z.string(),
  })
  .partial()

export type FormType = z.infer<typeof Form>

export type ResponseType = z.infer<typeof Response>

export type FailType = z.infer<typeof Fail>
