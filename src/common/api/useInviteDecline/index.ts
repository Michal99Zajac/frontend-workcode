import { useMutation, useQueryClient } from 'react-query'

import { api } from 'api'
import { createCodec } from 'codec'

import { Response, ErrorResponse } from './schema'

interface Params {
  invitationId: string
}

export const useInviteDecline = (params: Params) => {
  const { invitationId } = params
  const codec = createCodec(Response, ErrorResponse)
  const queryClient = useQueryClient()

  return useMutation<Response, ErrorResponse>({
    mutationKey: 'common_useInviteDecline__post__',
    mutationFn: () =>
      codec(api.post(`workspaces/invite/${invitationId}/decline`)),
    onSuccess: () => {
      queryClient.invalidateQueries('common_useInvitations__get__')
    },
  })
}

export * from './schema'
export default useInviteDecline
