import { z } from 'zod'

import { ApiError } from 'common/schemas'
import { Workspace } from 'workspace/schemas'

export const Response = Workspace

export const ErrorResponse = ApiError

export type Response = z.infer<typeof Response>

export type ErrorResponse = z.infer<typeof ErrorResponse>
