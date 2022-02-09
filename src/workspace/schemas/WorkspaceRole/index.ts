import { z } from 'zod'

export const WorkspaceRole = z.enum(['WATCHER', 'EDITOR', 'ADMIN'])

export type WorkspaceRoleEnum = z.infer<typeof WorkspaceRole>
