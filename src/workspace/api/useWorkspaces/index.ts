import { useQuery } from 'react-query'

import { api } from 'api'
import { createCodec } from 'codec'

import { Response, ErrorResponse, Form } from './schema'

export const useWorkspaces = (form: Form) => {
  const codec = createCodec(Response, ErrorResponse)
  const params: Record<string, string> = {}
  if (form.self) params.self = 'true'
  if (form.name) params.name = form.name
  // if (form.owner) params.owner = form.owner // TODO: after backend fix uncomment
  if (form.code && form.code !== 'ALL') params.code = form.code
  const query = new URLSearchParams(params)

  return useQuery<Response, ErrorResponse>({
    queryKey: ['workspace_useWorkspaces__get__', form],
    queryFn: () => codec(api.get(`workspaces?${query.toString()}`)),
    initialData: [],
  })
}

export * from './schema'
export default useWorkspaces
