import { useMutation } from 'react-query'

import { useApi } from 'api'
import { createCodec } from 'codec'

import { Form, Response, ErrorResponse } from './schema'

export const useUpdatePassword = () => {
  const api = useApi()
  const codec = createCodec(Response, ErrorResponse)

  return useMutation<Response, ErrorResponse, Form>(
    (form) => codec(api.patch('/users/me', form)),
    {
      mutationKey: 'config_useUpdatePassword__patch__',
    }
  )
}

export * from './schema'
export default useUpdatePassword
