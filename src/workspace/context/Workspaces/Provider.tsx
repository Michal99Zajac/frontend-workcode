import React from 'react'

import { WorkspaceType } from '../../schemas'

import { WorkspacesContext } from './Context'
import { SetWorkspaces } from './types'

interface WorkspacesProviderProps {
  children: React.ReactNode
  workspaces: WorkspaceType[]
  setWorkspaces: SetWorkspaces
}

export const WorkspacesProvider = (
  props: WorkspacesProviderProps
): JSX.Element => {
  const { children, workspaces, setWorkspaces } = props

  return (
    <WorkspacesContext.Provider
      value={{
        workspaces: workspaces,
        setWorkspaces: setWorkspaces,
      }}
    >
      {children}
    </WorkspacesContext.Provider>
  )
}

export default WorkspacesProvider
