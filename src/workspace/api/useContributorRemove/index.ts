import { useMutation, useQueryClient } from 'react-query'

import { _ID } from 'common/schemas'
import { useApi } from 'api'
import { createCodec } from 'codec'

import { Response, ErrorResponse } from './schema'

export const useContributorRemove = (workspaceId: _ID, userId: _ID) => {
  const api = useApi()
  const codec = createCodec(Response, ErrorResponse)
  const queryClient = useQueryClient()

  return useMutation<Response, ErrorResponse>(
    () =>
      codec(api.delete(`/workspaces/${workspaceId}/contributors/${userId}`)),
    {
      mutationKey: 'workspace_useContributorRemove__delete__',
      onSuccess: () => {
        queryClient.invalidateQueries('workspace_useWorkspaces__get__')
        queryClient.invalidateQueries('workspace_useWorkspace__get__')
        queryClient.invalidateQueries('workspace_useContributors__get__')
      },
    }
  )
}

export * from './schema'
export default useContributorRemove
