import { useQuery } from 'react-query'

import { api } from 'api'
import { createCodec } from 'codec'
import { makeQuery } from 'workspace/utils'

import { Response, ErrorResponse, Query } from './schema'

export const useUsersToInvite = (workspaceId: string, rawQuery: Query) => {
  const codec = createCodec(Response, ErrorResponse)
  const query = makeQuery(rawQuery)

  return useQuery<Response, ErrorResponse>({
    queryKey: ['workspace_useUsersToInvite__get__', query],
    queryFn: () => codec(api.get(`/workspaces/${workspaceId}/invite${query}`)),
  })
}

export * from './schema'
export default useUsersToInvite
