import { z } from 'zod'

import i18n from 'i18n'
import { User, ApiError } from 'common/schemas'

export const Form = z.object({
  password: z.string({
    required_error: i18n.t('auth.api.change_password.form.password'),
  }),
  repeatedPassword: z.string({
    required_error: i18n.t('auth.api.change_password.form.repeatedPassword'),
  }),
})

export const Response = User

export const ErrorResponse = ApiError

export type Form = z.infer<typeof Form>

export type Response = z.infer<typeof Response>

export type ErrorResponse = z.infer<typeof ErrorResponse>
