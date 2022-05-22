import { z } from 'zod'

import i18n from 'i18n'
import { ApiError } from 'common/schemas'
import { AuthUser, Token } from 'auth/schemas'

export const Form = z.object({
  email: z
    .string({ required_error: i18n.t('auth.api.sign_in.form.email') })
    .email(),
  password: z.string({
    required_error: i18n.t('auth.api.sign_in.form.password'),
  }),
})

export const Response = z.object({
  user: AuthUser,
  token: Token,
  message: z.string(),
})

export const ErrorResponse = ApiError

export type Form = z.infer<typeof Form>

export type Response = z.infer<typeof Response>

export type ErrorResponse = z.infer<typeof ErrorResponse>
