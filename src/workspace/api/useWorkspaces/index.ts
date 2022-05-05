import { useQuery } from 'react-query'

import { api } from 'api'
import { createCodec } from 'codec'

import { Response, ErrorResponse, Form } from './schema'

export const useWorkspaces = (form: Form) => {
  const codec = createCodec(Response, ErrorResponse)

  return useQuery<Response, ErrorResponse>('workspace_useWorkspaces__get__', {
    queryFn: () => codec(api.get('workspaces')),
    initialData: [],
  })
}

export * from './schema'
export default useWorkspaces
