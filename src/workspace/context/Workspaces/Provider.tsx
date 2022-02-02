import React from 'react'

import { WorkspacesContext } from './Context'
import { SetWorkspaces, Workspaces } from './types'

interface WorkspacesProviderProps {
  children: React.ReactNode
  workspaces: Workspaces
  setMyWorkspaces: SetWorkspaces
  setOtherWorkspaces: SetWorkspaces
}

export const WorkspacesProvider = (
  props: WorkspacesProviderProps
): JSX.Element => {
  const { children, workspaces, setMyWorkspaces, setOtherWorkspaces } = props

  return (
    <WorkspacesContext.Provider
      value={{
        workspaces: workspaces,
        setMyWorkspaces: setMyWorkspaces,
        setOtherWorkspaces: setOtherWorkspaces,
      }}
    >
      {children}
    </WorkspacesContext.Provider>
  )
}

export default WorkspacesProvider
