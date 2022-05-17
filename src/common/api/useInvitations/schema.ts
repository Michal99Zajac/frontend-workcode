import { z } from 'zod'

import { ApiError, Invitation } from 'common/schemas'

export const Response = Invitation.array()

export const ErrorResponse = ApiError

export type Response = z.infer<typeof Response>

export type ErrorResponse = z.infer<typeof ErrorResponse>
