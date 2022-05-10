import React from 'react'
import { Stack } from '@chakra-ui/react'

import { Surface, UserBucket, Invitations } from 'common/components'
import { useAuth } from 'common/store'

export function MenuBar(): JSX.Element {
  const user = useAuth((store) => store.user)

  return (
    <Surface
      as={Stack}
      p={1}
      borderRadius={0}
      alignItems="center"
      boxShadow="none"
    >
      {user && <UserBucket user={user} />}
      {user && <Invitations />}
    </Surface>
  )
}

export default MenuBar
