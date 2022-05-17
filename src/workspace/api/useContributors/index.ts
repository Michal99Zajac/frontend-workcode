import { useQuery } from 'react-query'

import { useApi } from 'api'
import { createCodec } from 'codec'

import { Response, ErrorResponse } from './schema'

export const useContributors = (workspaceId: string) => {
  const api = useApi()
  const codec = createCodec(Response, ErrorResponse)

  return useQuery<Response, ErrorResponse>({
    queryKey: 'workspace_useContributors__get__',
    queryFn: () => codec(api.get(`/workspaces/${workspaceId}/contributors`)),
  })
}

export * from './schema'
export default useContributors
