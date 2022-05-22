import { z } from 'zod'

import { ApiError } from 'common/schemas'
import { AuthUser } from 'auth/schemas/AuthUser'
import i18n from 'i18n'

export const Form = z.object({
  email: z
    .string({
      required_error: i18n.t('auth.api.sign_up.form.email.required'),
    })
    .email({ message: i18n.t('auth.api.sign_up.form.email.email') })
    .nonempty({ message: i18n.t('auth.api.sign_up.form.email.empty') }),
  name: z
    .string({
      required_error: i18n.t('auth.api.sign_up.form.name.required'),
    })
    .nonempty(),
  lastname: z
    .string({
      required_error: i18n.t('auth.api.sign_up.form.lastname.required'),
    })
    .nonempty(),
  password: z
    .string({
      required_error: i18n.t('auth.api.sign_up.form.password.required'),
    })
    .min(8, i18n.t('auth.api.sign_up.form.password.min'))
    .nonempty({ message: i18n.t('auth.api.sign_up.form.password.empty') }),
  repeatedPassword: z.string({
    required_error: i18n.t('auth.api.sign_up.form.repeatedPassword.required'),
  }),
})

export const Response = AuthUser

export const ErrorResponse = ApiError

export type Form = z.infer<typeof Form>

export type Response = z.infer<typeof Response>

export type ErrorResponse = z.infer<typeof ErrorResponse>
