import { useMutation } from 'react-query'

import { api } from 'api'

import { Form, ErrorResponse, Response } from './schema'

export const useSignIn = () => {
  return useMutation(
    (form: Form) =>
      api
        .post<Response>('/auth/signin', form)
        .then((response) => response.data)
        .catch((error) => error),
    {
      onError: (data) => {
        console.log({
          data,
        })
      },
      onSuccess: (data) => {
        console.log(data)
      },
    }
  )
}

export * from './schema'
export default useSignIn
