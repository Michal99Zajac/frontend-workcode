import { z } from 'zod'

import { UserSchema } from '../../schemas/UserSchema'

export const FormSchema = z.object({
  id: z.string().uuid(),
})

export const ResponseSchema = UserSchema

export type ResponseType = z.infer<typeof ResponseSchema>

export type FormType = z.infer<typeof FormSchema>
