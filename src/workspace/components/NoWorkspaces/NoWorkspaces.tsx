import React from 'react'
import { useColorModeValue, Button, Stack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import { NotFoundIcon } from 'icons/common'

export function NoWorkspaces() {
  const iconColor = useColorModeValue('blue.500', 'blue.200')

  return (
    <Stack>
      <NotFoundIcon fill={iconColor} fontSize="200px" />
      <Button as={Link} to="/workspace/create">
        Add workspace
      </Button>
    </Stack>
  )
}

export default NoWorkspaces
