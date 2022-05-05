import { useMutation } from 'react-query'

import { api } from 'api'
import { createCodec } from 'codec'

import { Form, Response, ErrorResponse } from './schema'

export const useSignIn = () => {
  const codec = createCodec(Response, ErrorResponse)

  return useMutation<Response, ErrorResponse, Form>(
    (form) => codec(api.post('/auth/signin', form)),
    {
      mutationKey: 'auth_useSignIn__post__',
    }
  )
}

export * from './schema'
export default useSignIn
