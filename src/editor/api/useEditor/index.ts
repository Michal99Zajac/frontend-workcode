import { useQuery } from 'react-query'

import { api } from 'api'
import { createCodec } from 'codec'
import { _ID } from 'common/schemas'

import { Response, ErrorResponse } from './schema'

interface Params {
  workspaceId: _ID
}

export const useEditor = (params: Params) => {
  const { workspaceId } = params
  const codec = createCodec(Response, ErrorResponse)

  return useQuery<Response, ErrorResponse>({
    queryKey: 'editor_useEditor__get__',
    queryFn: () => codec(api.get(`editors/${workspaceId}`)),
  })
}

export * from './schema'
export default useEditor
