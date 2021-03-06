import { useMutation, useQueryClient } from 'react-query'
import { produce } from 'immer'

import { useApi } from 'api'
import { createCodec } from 'codec'
import { useAuth } from 'common/store'

import { Form, Response, ErrorResponse } from './schema'

export const useUpdateMe = () => {
  const api = useApi()
  const auth = useAuth((store) => store)
  const queryClient = useQueryClient()
  const codec = createCodec(Response, ErrorResponse)

  return useMutation<Response, ErrorResponse, Form>(
    (form) => codec(api.patch('/users/me', form)),
    {
      mutationKey: 'config_useUpdateMe__patch__',
      onSuccess: (data) => {
        if (auth.user && auth.token) {
          auth.login(
            produce(auth.user, (draft) => {
              draft.email = data.email
              draft.name = data.name
              draft.lastname = data.lastname
            }),
            auth.token
          )
        }
        queryClient.invalidateQueries('config_useMe__get__')
      },
    }
  )
}

export * from './schema'
export default useUpdateMe
