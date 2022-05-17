import { useMutation, useQueryClient } from 'react-query'

import { useApi } from 'api'
import { createCodec } from 'codec'
import { _ID } from 'common/schemas'

import { Response, ErrorResponse } from './schema'

interface Props {
  workspaceId: _ID
}

export const useWorkspaceDelete = (props: Props) => {
  const { workspaceId } = props
  const api = useApi()
  const queryClient = useQueryClient()
  const codec = createCodec(Response, ErrorResponse)

  return useMutation<Response, ErrorResponse>(
    () => codec(api.delete(`/workspaces/${workspaceId}`)),
    {
      mutationKey: 'workspace_useWorkspaceDelete__delete__',
      onSuccess: () => {
        queryClient.invalidateQueries('workspace_useWorkspaces__get__')
      },
    }
  )
}

export * from './schema'
export default useWorkspaceDelete
