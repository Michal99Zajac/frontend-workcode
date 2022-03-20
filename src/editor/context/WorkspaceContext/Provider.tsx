import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

import { Workspace } from '../../../workspace/schemas'
import { getWorkspace, Fail } from '../../../workspace/api/getWorkspace'
import { useToast } from '../../../common/hooks'

import { WorkspaceContext } from './Context'

interface WorkspaceProviderProps {
  children: React.ReactNode
}

export const WorkspaceProvider = (props: WorkspaceProviderProps) => {
  const { children } = props
  const { workspaceId } = useParams()
  const navigate = useNavigate()
  const toast = useToast()

  if (!workspaceId) return <Navigate to="/workspace" />

  const [isLoading, setIsLoading] = useState(true)
  const [workspace, setWorkspace] = useState<Workspace | null>(null)

  const fetchWorkspace = async () => {
    setIsLoading(true)

    try {
      const response = await getWorkspace({ workspaceId })
      setWorkspace(response.workspace)
    } catch (error) {
      const fail = Fail.parse(error)
      toast(fail, 'Workspace', 'error')
      navigate('/workspace')
    }

    setIsLoading(false)
  }

  useEffect(() => {
    fetchWorkspace()
  }, [])

  return (
    <WorkspaceContext.Provider
      value={{
        isLoading: isLoading,
        workspace: workspace,
        setWorkspace: (workspace) => setWorkspace(workspace),
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  )
}

export default WorkspaceProvider
