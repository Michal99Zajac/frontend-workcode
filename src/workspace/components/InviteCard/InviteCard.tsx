import React from 'react'
import { Box, Avatar } from '@chakra-ui/react'

import { UserType } from '../../../common/schemas'

interface InviteCardProps {
  user: UserType
}

export function InviteCard(props: InviteCardProps): JSX.Element {
  const { user } = props
  return (
    <Box>
      <Avatar
        src={user.src || undefined}
        name={`${user.firstname} ${user.lastname}`}
      />
    </Box>
  )
}

export default InviteCard
