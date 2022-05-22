import React from 'react'
import { Box, Text, BoxProps } from '@chakra-ui/react'

import { useMode } from 'common/hooks'

interface Props extends BoxProps {
  name: string
}

export function WorkspaceLabel(props: Props) {
  const { name, ...rest } = props
  const mode = useMode()

  return (
    <Box {...rest}>
      <Text color={mode('blue.600', 'blue.50')} fontSize="xs">
        {name}
      </Text>
    </Box>
  )
}

export default WorkspaceLabel
