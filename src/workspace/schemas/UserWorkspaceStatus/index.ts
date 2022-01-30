import { z } from 'zod'

export const UserWorkspaceStatus = z.enum(['PENDING', 'READY', 'DENIAL'])

export type UserWorkspaceStatusType = z.infer<typeof UserWorkspaceStatus>
