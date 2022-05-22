import { z } from 'zod'

import i18n from 'i18n'
import { User } from 'common/schemas'

export const Form = z.object({
  password: z.string({
    required_error: i18n.t('config.api.password_update.form.password.required'),
  }),
  repeatedPassword: z.string({
    required_error: i18n.t(
      'config.api.password_update.form.repeatedPassword.required'
    ),
  }),
})

export const Response = User

export const ErrorResponse = z.object({
  message: z.record(z.string()),
})

export type Form = z.infer<typeof Form>

export type Response = z.infer<typeof Response>

export type ErrorResponse = z.infer<typeof ErrorResponse>
