import { useMutation } from 'react-query'

import { _ID } from 'common/schemas'
import { api } from 'api'
import { createCodec } from 'codec'

import { Form, Response, ErrorResponse } from './schema'

export const useInvite = (workspaceId: _ID) => {
  const codec = createCodec(Response, ErrorResponse)

  return useMutation<Response, ErrorResponse, Form>(
    (form) => codec(api.post(`/workspaces/${workspaceId}/invite`, form)),
    {
      mutationKey: 'workspace_useInvite__post__',
    }
  )
}

export * from './schema'
export default useInvite
