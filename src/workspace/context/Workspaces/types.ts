import { WorkspaceType } from '../../schemas'

export type Workspaces = {
  my: WorkspaceType[]
  other: WorkspaceType[]
}

export type SetWorkspaces = (workspaces: WorkspaceType[]) => void

export interface WorkspacesContextType {
  workspaces: Workspaces
  setMyWorkspaces: SetWorkspaces
  setOtherWorkspaces: SetWorkspaces
}
