import { useQuery } from 'react-query'

import { useApi } from 'api'
import { createCodec } from 'codec'

import { Response, ErrorResponse } from './schema'

export const useMe = () => {
  const api = useApi()
  const codec = createCodec(Response, ErrorResponse)

  return useQuery<Response, ErrorResponse>('config_useMe__get__', {
    queryFn: () => codec(api.get('users/me')),
  })
}

export * from './schema'
export default useMe
