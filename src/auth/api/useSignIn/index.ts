import { useMutation } from 'react-query'

import { api } from 'api'
import { codec } from 'codec'

import { Form, Response } from './schema'

export const useSignIn = () => {
  return useMutation(
    (form: Form) =>
      codec(api.post('/auth/signin', form), {
        success: (data) => Response.parse(data),
      }),
    {
      mutationKey: 'signin',
    }
  )
}

export * from './schema'
export default useSignIn
