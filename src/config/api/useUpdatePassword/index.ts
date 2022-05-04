import { useMutation } from 'react-query'

import { api } from 'api'
import { createCodec } from 'codec'
import { useAuth } from 'common/store'

import { Form, Response, ErrorResponse } from './schema'

export const useUpdatePassword = () => {
  const token = useAuth((store) => store.token)
  const codec = createCodec(Response, ErrorResponse)

  return useMutation<Response, ErrorResponse, Form>(
    (form) =>
      codec(
        api.patch('/users/me', form, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      ),
    {
      mutationKey: 'update-password',
    }
  )
}

export * from './schema'
export default useUpdatePassword
