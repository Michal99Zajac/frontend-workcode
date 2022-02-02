import React from 'react'

import { WorkspacesContextType } from './types'

export const WorkspacesContext = React.createContext<WorkspacesContextType>({
  workspaces: {
    my: [],
    other: [],
  },
  setMyWorkspaces: () => {},
  setOtherWorkspaces: () => {},
})

export default WorkspacesContext
