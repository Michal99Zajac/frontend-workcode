import { useMutation, useQueryClient } from 'react-query'

import { api } from 'api'
import { createCodec } from 'codec'

import { Response, ErrorResponse } from './schema'

interface Params {
  invitationId: string
}

export const useInviteAccept = (params: Params) => {
  const { invitationId } = params
  const codec = createCodec(Response, ErrorResponse)
  const queryClient = useQueryClient()

  return useMutation<Response, ErrorResponse>({
    mutationKey: 'common_useInviteAccept__post__',
    mutationFn: () =>
      codec(api.post(`workspaces/invite/${invitationId}/accept`)),
    onSuccess: () => {
      queryClient.invalidateQueries('common_useInvitations__get__')
      queryClient.invalidateQueries('workspace_useWorkspaces__get__')
    },
  })
}

export * from './schema'
export default useInviteAccept
