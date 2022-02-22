import React from 'react'
import { BoxProps, Box } from '@chakra-ui/react'

export const Surface = React.forwardRef<HTMLDivElement, BoxProps>(
  (props, ref) => {
    return <Box {...props} ref={ref} />
  }
)

Surface.displayName = 'Surface'

export default Surface
