import { useQuery } from 'react-query'

import { api } from 'api'
import { createCodec } from 'codec'
import { useAuth } from 'common/store'

import { Response, ErrorResponse } from './schema'

export const useMe = () => {
  const token = useAuth((store) => store.token)
  const codec = createCodec(Response, ErrorResponse)

  return useQuery<Response, ErrorResponse>('me', {
    queryFn: () =>
      codec(
        api.get('users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      ),
  })
}

export * from './schema'
export default useMe
