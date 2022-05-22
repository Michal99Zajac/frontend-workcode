import { z } from 'zod'

import { Error } from 'common/schemas'

export const ApiError = z.object({
  error: Error,
})

export type ApiError = z.infer<typeof ApiError>
