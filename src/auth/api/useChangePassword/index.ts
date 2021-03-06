import { useMutation } from 'react-query'

import { useApi } from 'api'
import { createCodec } from 'codec'

import { Form, Response, ErrorResponse } from './schema'

export const useChangePassword = (token?: string) => {
  const api = useApi()
  const codec = createCodec(Response, ErrorResponse)

  if (!token) throw new Error('Token is not provided')

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
      mutationKey: 'auth_useChangePassword__patch__',
    }
  )
}

export * from './schema'
export default useChangePassword
