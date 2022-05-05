import { useQuery } from 'react-query'

import { api } from 'api'
import { createCodec } from 'codec'

import { Response, ErrorResponse } from './schema'

export const useMe = () => {
  const codec = createCodec(Response, ErrorResponse)

  return useQuery<Response, ErrorResponse>('get__users_me', {
    queryFn: () => codec(api.get('users/me')),
  })
}

export * from './schema'
export default useMe
