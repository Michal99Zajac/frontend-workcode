import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Badge, Text, Tr, Td, Link, useColorModeValue } from '@chakra-ui/react'
import dayjs from 'dayjs'

import { AvatarTag } from '../AvatarTag'
import { ContributorAvatars } from '../ContributorAvatars'
import { WorkspaceType } from '../../schemas'
import { codeColors } from '../../utils'
import RecordMenu from '../RecordMenu'

interface WorkspaceRecordProps {
  workspace: WorkspaceType
  isOwner?: boolean
}

export function WorkspaceRecord(props: WorkspaceRecordProps): JSX.Element {
  const { workspace, isOwner } = props
  const hoverRecord = useColorModeValue('gray.200', 'gray.600')
  const borderColor = useColorModeValue('gray.100', 'gray.600')

  return (
    <Tr _hover={{ bg: hoverRecord }}>
      <Td borderColor={borderColor}>
        <Link as={RouterLink} to={`/editor/${workspace.id}`}>
          <Text isTruncated>{workspace.name}</Text>
        </Link>
      </Td>
      <Td borderColor={borderColor}>
        <Badge {...codeColors[workspace.code]}>{workspace.code}</Badge>
      </Td>
      <Td borderColor={borderColor}>
        <AvatarTag user={workspace.admin} />
      </Td>
      <Td borderColor={borderColor}>
        <ContributorAvatars
          workspaceId={workspace.id}
          contributors={workspace.contributors}
          isOwner={isOwner}
        />
      </Td>
      <Td isNumeric borderColor={borderColor}>
        <Text>{dayjs(workspace.createdAt).format('D/MM/YYYY')}</Text>
      </Td>
      <Td isNumeric borderColor={borderColor}>
        <RecordMenu workspaceId={workspace.id} isOwner={isOwner} />
      </Td>
    </Tr>
  )
}

export default WorkspaceRecord
