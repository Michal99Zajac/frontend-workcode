import React from 'react'

import { Workspace } from '../../../workspace/schemas'

type SetWorkspace = (workspace: Workspace) => void
interface WorkspaceContext {
  isLoading: boolean
  workspace: Workspace | null
  setWorkspace: SetWorkspace
}

const noop = () => {}
export const WorkspaceContext = React.createContext<WorkspaceContext>({
  isLoading: true,
  workspace: null,
  setWorkspace: noop,
})

export default WorkspaceContext
