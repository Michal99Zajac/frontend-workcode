import { Workspaces as SplitedWorkspaces } from '../../context/Workspaces/types'
import { WorkspaceType } from '../../schemas/Workspace'

export const splitWorkspaces = (
  workspaces: WorkspaceType[],
  currentUserId: string
): SplitedWorkspaces => {
  const my: WorkspaceType[] = []
  const other: WorkspaceType[] = []

  for (const workspace of workspaces) {
    if (workspace.admin.id === currentUserId) {
      my.push(workspace)
    } else {
      other.push(workspace)
    }
  }

  return {
    my: my,
    other: other,
  }
}

export default splitWorkspaces
