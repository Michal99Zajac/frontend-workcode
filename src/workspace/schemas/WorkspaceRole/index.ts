import { z } from 'zod'

export const WorkspaceRole = z.enum(['WATCHER', 'EDITOR', 'ADMIN'])

export type WorkspaceRole = z.infer<typeof WorkspaceRole>
