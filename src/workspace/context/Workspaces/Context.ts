import React from 'react'

import { WorkspacesContextType } from './types'

export const WorkspacesContext = React.createContext<WorkspacesContextType>({
  workspaces: [],
  setWorkspaces: () => {},
})

export default WorkspacesContext
