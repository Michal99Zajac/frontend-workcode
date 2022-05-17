import { useContext } from 'react'

import { WorkspaceContext } from 'editor/context'

export const useWorkspace = () => {
  const workspace = useContext(WorkspaceContext)

  if (!workspace) throw new Error('Workspace context is not provided')

  return { ...workspace.editorWorkspace }
}

export default useWorkspace
