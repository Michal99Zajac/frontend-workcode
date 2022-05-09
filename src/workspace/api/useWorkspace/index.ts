import { useQuery } from 'react-query'

import { api } from 'api'
import { createCodec } from 'codec'

import { Response, ErrorResponse } from './schema'

interface Props {
  _id: string
}

export const useWorkspace = (props: Props) => {
  const { _id } = props
  const codec = createCodec(Response, ErrorResponse)

  return useQuery<Response, ErrorResponse>({
    queryKey: 'workspace_useWorkspace__get__',
    queryFn: () => codec(api.get(`workspaces/${_id}`)),
  })
}

export * from './schema'
export default useWorkspace
