import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { _ID } from 'common/schemas'
import { useEditorWorkspace } from 'editor/api/useEditorWorkspace'
import { useToast } from 'common/hooks'
import { FullLoading } from 'common/components'

import { WorkspaceContext } from './Context'

interface WorkspaceProviderProps {
  children: React.ReactNode
  workspaceId: _ID
}

export const WorkspaceProvider = (props: WorkspaceProviderProps) => {
  const { children, workspaceId } = props
  const { t } = useTranslation()
  const { isLoading, data, isError, error } = useEditorWorkspace({
    workspaceId,
  })
  const toast = useToast()

  useEffect(() => {
    if (isError && error?.error) {
      toast(
        error.error,
        t('editor.context.workspace.provider.toast.error.api.title'),
        'error'
      )
    }
  }, [isError])

  if (isError) return <Navigate to="/workspace" />

  if (!data) return <FullLoading />

  if (isLoading) return <FullLoading />

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
