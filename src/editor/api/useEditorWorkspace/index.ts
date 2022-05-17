import { useQuery } from 'react-query'

import { useApi } from 'api'
import { createCodec } from 'codec'
import { _ID } from 'common/schemas'

import { Response, ErrorResponse } from './schema'

interface Params {
  workspaceId: _ID
}

export const useEditorWorkspace = (params: Params) => {
  const { workspaceId } = params
  const api = useApi()
  const codec = createCodec(Response, ErrorResponse)

  return useQuery<Response, ErrorResponse>({
    queryKey: 'editor_useEditorWorkspace__get__',
    queryFn: () => codec(api.get(`editors/${workspaceId}`)),
  })
}

export * from './schema'
export default useEditorWorkspace
