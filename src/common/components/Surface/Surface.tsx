import React from 'react'
import clsx from 'clsx'
import { BoxProps, Box, useColorMode } from '@chakra-ui/react'

import classes from './Surface.module.scss'

export const Surface = React.forwardRef<HTMLDivElement, BoxProps>(
  (props, ref) => {
    const { surface, surfaceDark, surfaceLight } = classes
    const { colorMode } = useColorMode()

    return (
      <Box
        {...props}
        ref={ref}
        className={clsx(
          surface,
          colorMode === 'dark' ? surfaceDark : surfaceLight
        )}
      />
    )
  }
)

Surface.displayName = 'Surface'

export default Surface
