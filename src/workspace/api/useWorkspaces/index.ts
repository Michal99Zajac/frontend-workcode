import { useQuery } from 'react-query'

import { useApi } from 'api'
import { createCodec } from 'codec'
import { makeQuery } from 'workspace/utils'

import { Response, ErrorResponse, Form } from './schema'

export const useWorkspaces = (form: Form) => {
  const api = useApi()
  const codec = createCodec(Response, ErrorResponse)
  const query = makeQuery(form)

  return useQuery<Response, ErrorResponse>({
    queryKey: ['workspace_useWorkspaces__get__', form],
    queryFn: () => codec(api.get(`workspaces${query}`)),
    initialData: [],
  })
}

export * from './schema'
export default useWorkspaces
