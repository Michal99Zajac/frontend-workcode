import { useContext } from 'react'

import { WorkspaceContext } from '../../context/WorkspaceContext'

export const useWorkspace = () => {
  const workspace = useContext(WorkspaceContext)

  if (!workspace) throw new Error('Workspace context is not provided')

  return workspace
}

export default useWorkspace
