import { z } from 'zod'

export const UserWorkspaceStatus = z.enum(['PENDING', 'READY', 'DENIAL'])

export type UserWorkspaceStatus = z.infer<typeof UserWorkspaceStatus>
