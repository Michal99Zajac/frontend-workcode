import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Badge, Text, Tr, Td, Link, useColorModeValue } from '@chakra-ui/react'
import dayjs from 'dayjs'

import { AvatarTag } from '../AvatarTag'
import { ContributorAvatars } from '../ContributorAvatars'
import { Workspace } from '../../schemas'
import { codeColors } from '../../../common/utils'
import RecordMenu from '../RecordMenu'

interface WorkspaceRecordProps {
  workspace: Workspace
  isOwner?: boolean
}

export function WorkspaceRecord(props: WorkspaceRecordProps): JSX.Element {
  const { workspace, isOwner } = props
  const hoverRecord = useColorModeValue('gray.200', 'gray.600')
  const borderColor = useColorModeValue('gray.100', 'gray.600')

  return (
    <Tr _hover={{ bg: hoverRecord }}>
      <Td borderColor={borderColor}>
        <Link as={RouterLink} to={`/editor/${workspace._id}`}>
          <Text isTruncated maxW="300px">
            {workspace.name}
          </Text>
        </Link>
      </Td>
      <Td borderColor={borderColor}>
        <Badge {...codeColors[workspace.code]}>{workspace.code}</Badge>
      </Td>
      <Td borderColor={borderColor}>
        <AvatarTag user={workspace.author} />
      </Td>
      <Td borderColor={borderColor}>
        <ContributorAvatars
          workspaceId={workspace._id}
          contributors={workspace.contributors}
          isOwner={isOwner}
        />
      </Td>
      <Td isNumeric borderColor={borderColor}>
        <Text>{dayjs(workspace.createdAt).format('D/MM/YYYY')}</Text>
      </Td>
      <Td isNumeric borderColor={borderColor}>
        <RecordMenu workspaceId={workspace._id} isOwner={isOwner} />
      </Td>
    </Tr>
  )
}

export default WorkspaceRecord
