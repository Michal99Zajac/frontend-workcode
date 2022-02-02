import { useContext } from 'react'

import {
  WorkspacesContext,
  WorkspacesContextType,
} from '../../context/Workspaces'

export const useWorkspaces = (): WorkspacesContextType => {
  const workspaces = useContext(WorkspacesContext)

  if (!workspaces) throw new Error('Workspaces context is not provided')

  return workspaces
}

export default useWorkspaces
