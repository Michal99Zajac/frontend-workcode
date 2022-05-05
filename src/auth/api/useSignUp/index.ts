import { useMutation } from 'react-query'

import { createCodec } from 'codec'
import { api } from 'api'

import { Form, Response, ErrorResponse } from './schema'

export const useSignUp = () => {
  const codec = createCodec(Response, ErrorResponse)

  return useMutation<Response, ErrorResponse, Form>(
    (form: Form) => codec(api.post('/auth/signup', form)),
    {
      mutationKey: 'signup',
    }
  )
}

export * from './schema'
export default useSignUp