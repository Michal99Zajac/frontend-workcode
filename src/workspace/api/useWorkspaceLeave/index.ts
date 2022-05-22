import { useMutation, useQueryClient } from 'react-query'

import { useApi } from 'api'
import { createCodec } from 'codec'

import { Response, ErrorResponse } from './schema'

interface Props {
  workspaceId: string
}

export const useWorkspaceLeave = (props: Props) => {
  const { workspaceId } = props
  const api = useApi()
  const queryClient = useQueryClient()
  const codec = createCodec(Response, ErrorResponse)

  return useMutation<Response, ErrorResponse>(
    () => codec(api.post(`/workspaces/${workspaceId}/leave`)),
    {
      mutationKey: 'workspace_useWorkspaceLeave__post__',
      onSuccess: () => {
        queryClient.invalidateQueries('workspace_useWorkspaces__get__')
      },
    }
  )
}

export * from './schema'
export default useWorkspaceLeave
