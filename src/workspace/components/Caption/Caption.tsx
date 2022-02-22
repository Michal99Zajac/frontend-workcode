import React from 'react'
import { Text } from '@chakra-ui/react'

interface CaptionProps {
  children: React.ReactNode
}

export function Caption(props: CaptionProps): JSX.Element {
  const { children } = props

  return <Text fontSize="xs">{children}</Text>
}

export default Caption
