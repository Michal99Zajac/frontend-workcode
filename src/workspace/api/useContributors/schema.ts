import { z } from 'zod'

import { User, ApiError } from 'common/schemas'

export const Response = User.array()

export const ErrorResponse = ApiError

export type Response = z.infer<typeof Response>

export type ErrorResponse = z.infer<typeof ErrorResponse>
