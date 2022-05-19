import React from 'react'
import { useMediaQuery, Center } from '@chakra-ui/react'

import { PhoneIcon } from 'icons/common'
import { useMode } from 'common/hooks'

interface Props {
  children: React.ReactNode
}

export function Mobile(props: Props) {
  const { children } = props
  const [isMobile] = useMediaQuery(['(max-width: 30em)'])
  const mode = useMode()

  if (!isMobile) return <>{children}</>

  return (
    <Center w="100%" h="100%">
      <PhoneIcon fontSize="9xl" fill={mode('blue.600', 'blue.200')} />
    </Center>
  )
}

export default Mobile
