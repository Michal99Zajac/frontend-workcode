import React from 'react'
import { Box } from '@chakra-ui/react'

import { AvatarTag } from '../AvatarTag'
import { WorkspaceType } from '../../schemas'

interface WorkspaceCardProps {
  workspace: WorkspaceType
}

export function WorkspaceCard(props: WorkspaceCardProps): JSX.Element {
  const { workspace } = props
  return (
    <Box>
      <AvatarTag user={workspace.admin} />
    </Box>
  )
}

export default WorkspaceCard
