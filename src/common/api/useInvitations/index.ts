import { useQuery } from 'react-query'

import { api } from 'api'
import { createCodec } from 'codec'

import { Response, ErrorResponse } from './schema'

export const useInvitations = () => {
  const codec = createCodec(Response, ErrorResponse)

  return useQuery<Response, ErrorResponse>({
    queryKey: 'common_useInvitations__get__',
    queryFn: () => codec(api.get('/users/me/invitations')),
  })
}

export * from './schema'
export default useInvitations
