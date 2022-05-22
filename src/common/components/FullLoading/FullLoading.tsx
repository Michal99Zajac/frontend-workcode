import React from 'react'
import { Center, Spinner } from '@chakra-ui/react'

import { useMode } from 'common/hooks'

export function FullLoading() {
  const mode = useMode()

  return (
    <Center w="100%" h="100%">
      <Spinner
        w="100px"
        h="100px"
        speed="0.65s"
        thickness="8px"
        color={mode('blue.600', 'blue.200')}
      />
    </Center>
  )
}

export default FullLoading
