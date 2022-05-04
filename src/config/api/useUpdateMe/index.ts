import { useMutation, useQueryClient } from 'react-query'
import { produce } from 'immer'

import { api } from 'api'
import { createCodec } from 'codec'
import { useAuth } from 'common/store'

import { Form, Response, ErrorResponse } from './schema'

export const useUpdateMe = () => {
  const auth = useAuth((store) => store)
  const queryClient = useQueryClient()
  const codec = createCodec(Response, ErrorResponse)

  return useMutation<Response, ErrorResponse, Form>(
    (form) =>
      codec(
        api.patch('/users/me', form, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        })
      ),
    {
      mutationKey: 'update-me',
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
        queryClient.invalidateQueries('me')
      },
    }
  )
}

export * from './schema'
export default useUpdateMe
