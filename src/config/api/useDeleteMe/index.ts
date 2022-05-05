import { useMutation } from 'react-query'

import { api } from 'api'
import { createCodec } from 'codec'
import { useAuth } from 'common/store'

import { Form, Response, ErrorResponse } from './schema'

export const useDeleteMe = () => {
  const logout = useAuth((store) => store.logout)
  const codec = createCodec(Response, ErrorResponse)

  return useMutation<Response, ErrorResponse, Form>(
    (form) => codec(api.delete('/users/me', { data: form })),
    {
      mutationKey: 'config_useDeleteMe__delete__',
      onSuccess: () => {
        logout()
      },
    }
  )
}

export * from './schema'
export default useDeleteMe
