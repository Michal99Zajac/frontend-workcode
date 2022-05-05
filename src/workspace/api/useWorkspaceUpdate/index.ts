import { useMutation, useQueryClient } from 'react-query'

import { api } from 'api'
import { createCodec } from 'codec'

import { Form, Response, ErrorResponse } from './schema'

interface Props {
  _id: string
}

export const useWorkspaceUpdate = (props: Props) => {
  const { _id } = props
  const queryClient = useQueryClient()
  const codec = createCodec(Response, ErrorResponse)

  return useMutation<Response, ErrorResponse, Form>(
    (form) => codec(api.patch(`/workspaces/${_id}`, form)),
    {
      mutationKey: ['workspace_useWorkspaceUpdate__patch__', _id],
      onSuccess: () => {
        queryClient.invalidateQueries('workspace_useWorkspaces__get__')
      },
    }
  )
}

export * from './schema'
export default useWorkspaceUpdate
