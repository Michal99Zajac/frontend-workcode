import { useCallback, useState } from 'react'

import { useToast } from '../../../common/hooks'
import { useWorkspaceFetch } from '../../store'
import { deleteWorkspace, Fail } from '../../api/deleteWorkspace'

type DeleteWorkspace = () => void

export const useDeleteWorkspace = (
  workspaceId: string
): [DeleteWorkspace, boolean] => {
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()
  const refetchWorkspaces = useWorkspaceFetch((store) => store.refetch)

  const del = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await deleteWorkspace({
        workspaceId: workspaceId,
      })
      toast({ success: response.success }, 'Success', 'success')
      refetchWorkspaces && refetchWorkspaces()
    } catch (error) {
      const fail = Fail.parse(error)
      toast(fail, 'Error', 'error')
    }
    setIsLoading(false)
  }, [workspaceId])

  return [del, isLoading]
}

export default useDeleteWorkspace
