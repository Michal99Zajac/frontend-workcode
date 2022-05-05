import { useMutation, useQueryClient } from 'react-query'

import { api } from 'api'
import { createCodec } from 'codec'

import { Form, Response, ErrorResponse } from './schema'

export const useWorkspaceCreate = () => {
  const queryClient = useQueryClient()
  const codec = createCodec(Response, ErrorResponse)

  return useMutation<Response, ErrorResponse, Form>(
    (form) => codec(api.post('/workspaces', form)),
    {
      mutationKey: 'workspace_useWorkspaceCreate__post__',
      onSuccess: () => {
        queryClient.invalidateQueries('workspace_useWorkspaces__get__')
      },
    }
  )
}

export * from './schema'
export default useWorkspaceCreate
