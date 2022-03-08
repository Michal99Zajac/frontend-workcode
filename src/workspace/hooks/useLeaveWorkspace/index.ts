import { useCallback, useState } from 'react'

import { useToast } from '../../../common/hooks'
import { useWorkspaceFetch } from '../../store'
import { leaveWorkspace, Fail } from '../../api/leaveWorkspace'

type LeaveWorkspace = () => void

export const useLeaveWorkspace = (
  workspaceId: string
): [LeaveWorkspace, boolean] => {
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()
  const refetchWorkspaces = useWorkspaceFetch((store) => store.refetch)

  const del = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await leaveWorkspace({
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

export default LeaveWorkspace
