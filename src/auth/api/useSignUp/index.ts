import { useMutation } from 'react-query'

import { createCodec } from 'codec'
import { useApi } from 'api'

import { Form, Response, ErrorResponse } from './schema'

export const useSignUp = () => {
  const api = useApi()
  const codec = createCodec(Response, ErrorResponse)

  return useMutation<Response, ErrorResponse, Form>(
    (form: Form) => codec(api.post('/auth/signup', form)),
    {
      mutationKey: 'auth_useSignUp__post__',
    }
  )
}

export * from './schema'
export default useSignUp
