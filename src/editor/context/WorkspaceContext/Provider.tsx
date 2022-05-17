import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'

import { _ID } from 'common/schemas'
import { useEditorWorkspace } from 'editor/api/useEditorWorkspace'
import { useToast } from 'common/hooks'

import { WorkspaceContext } from './Context'

interface WorkspaceProviderProps {
  children: React.ReactNode
  workspaceId: _ID
}

export const WorkspaceProvider = (props: WorkspaceProviderProps) => {
  const { children, workspaceId } = props
  const { isLoading, data, isError, error } = useEditorWorkspace({
    workspaceId,
  })
  const toast = useToast()

  useEffect(() => {
    if (isError && error?.error) {
      toast(error.error, 'Editor', 'error')
    }
  }, [isError])

  if (isError) return <Navigate to="/workspace" />

  if (!data) return <div>Loading...</div>

  if (isLoading) return <div>Loading...</div>

  return (
    <WorkspaceContext.Provider
      value={{
        editorWorkspace: data,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  )
}

export default WorkspaceProvider
