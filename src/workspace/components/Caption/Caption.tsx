import React from 'react'
import { Text, useColorMode } from '@chakra-ui/react'
import clsx from 'clsx'

import classes from './Caption.module.scss'

interface CaptionProps {
  children: React.ReactNode
}

export function Caption(props: CaptionProps): JSX.Element {
  const { children } = props
  const { colorMode } = useColorMode()

  return (
    <Text
      fontSize="xs"
      className={clsx(
        colorMode === 'dark' ? classes.captionDark : classes.captionLight
      )}
    >
      {children}
    </Text>
  )
}

export default Caption
