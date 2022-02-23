import React from 'react'
import { BoxProps, Box, useColorModeValue } from '@chakra-ui/react'

export const Surface = React.forwardRef<HTMLDivElement, BoxProps>(
  (props, ref) => {
    const bg = useColorModeValue('gray.50', 'gray.700')

    return (
      <Box
        {...props}
        ref={ref}
        bg={bg}
        boxShadow="lg"
        borderRadius="md"
        p="6"
      />
    )
  }
)

Surface.displayName = 'Surface'

export default Surface
