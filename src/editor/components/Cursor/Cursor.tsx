import React from 'react'
import { Box, Tooltip } from '@chakra-ui/react'

import { User } from 'common/schemas'
import { Cord } from 'types'

interface Props {
  cord: Cord
  user: User
  color: string
}

export function Cursor(props: Props): JSX.Element {
  const { cord, user, color } = props

  return (
    <Tooltip bg={color} hasArrow label={`${user.name} ${user.lastname}`}>
      <Box
        position="absolute"
        top={cord.top}
        left={cord.left}
        bottom={cord.bottom}
        w="2px"
        minW="2px"
        minH="20px"
        h="20px"
        bgColor={color}
        zIndex="modal"
      />
    </Tooltip>
  )
}

export default Cursor
