import { WorkspaceType } from '../../schemas'

export type SetWorkspaces = (workspaces: WorkspaceType[]) => void

export interface WorkspacesContextType {
  workspaces: WorkspaceType[]
  setWorkspaces: SetWorkspaces
}
