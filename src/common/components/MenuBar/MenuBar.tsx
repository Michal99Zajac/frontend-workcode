import React from 'react'
import { Stack } from '@chakra-ui/react'

import { Surface, UserBucket } from 'common/components'
import { useAuth } from 'common/store'

export function MenuBar(): JSX.Element {
  const user = useAuth((store) => store.user)

  return (
    <Surface as={Stack} p={1} borderRadius={0} boxShadow="none">
      {user && <UserBucket user={user} />}
    </Surface>
  )
}

export default MenuBar
