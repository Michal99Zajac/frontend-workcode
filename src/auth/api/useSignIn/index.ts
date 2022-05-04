import { useMutation } from 'react-query'

import { api } from 'api'
import { createCodec } from 'codec'

import { Form, Response, ErrorResponse } from './schema'

export const useSignIn = () => {
  const code = createCodec(Response, ErrorResponse)

  return useMutation<Response, ErrorResponse, Form>(
    (form) => code(api.post('/auth/signin', form)),
    {
      mutationKey: 'signin',
    }
  )
}

export * from './schema'
export default useSignIn
