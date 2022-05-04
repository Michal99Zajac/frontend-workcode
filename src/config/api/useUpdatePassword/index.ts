import { useMutation } from 'react-query'

import { api } from 'api'
import { createCodec } from 'codec'

import { Form, Response, ErrorResponse } from './schema'

export const useUpdatePassword = () => {
  const codec = createCodec(Response, ErrorResponse)

  return useMutation<Response, ErrorResponse, Form>(
    (form) => codec(api.patch('/users/me', form)),
    {
      mutationKey: 'update-password',
    }
  )
}

export * from './schema'
export default useUpdatePassword
