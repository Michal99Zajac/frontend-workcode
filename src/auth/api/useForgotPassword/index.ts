import { useMutation } from 'react-query'

import { createCodec } from 'codec'
import { api } from 'api'

import { Form, Response, ErrorResponse } from './schema'

export const useForgotPassword = () => {
  const codec = createCodec(Response, ErrorResponse)

  return useMutation<Response, ErrorResponse, Form>(
    (form: Form) => codec(api.post('/auth/forgot-password', form)),
    {
      mutationKey: 'forgot-password',
    }
  )
}

export * from './schema'
export default useForgotPassword
