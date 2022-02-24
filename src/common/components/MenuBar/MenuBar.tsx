import React from 'react'
import { Stack } from '@chakra-ui/react'

import { Surface } from '../Surface'
import { UserBucket } from '../UserBucket'

export function MenuBar(): JSX.Element {
  return (
    <Surface as={Stack} p={1} borderRadius={0} boxShadow="none">
      <UserBucket />
    </Surface>
  )
}

export default MenuBar
