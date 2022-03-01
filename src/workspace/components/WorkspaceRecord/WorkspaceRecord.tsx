import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import {
  Badge,
  Text,
  MenuItem,
  Menu,
  MenuButton,
  MenuList,
  IconButton,
  Tr,
  Td,
  Link,
  useColorModeValue,
} from '@chakra-ui/react'
import { HamburgerIcon, SettingsIcon } from '@chakra-ui/icons'
import dayjs from 'dayjs'

import { AvatarTag } from '../AvatarTag'
import { MenuCardUpdate } from '../MenuCardUpdate'
import { MenuCardCopy } from '../MenuCardCopy'
import { MenuCardInvite } from '../MenuCardInvite'
import { ContributorAvatars } from '../ContributorAvatars'
import { WorkspaceType } from '../../schemas'
import { codeColors } from '../../utils'

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
        <Menu>
          <MenuButton
            as={IconButton}
            variant="ghost"
            colorScheme="gray"
            icon={<HamburgerIcon />}
            size="sm"
          />
          <MenuList>
            {isOwner && <MenuCardUpdate workspace={workspace} />}
            {isOwner && <MenuCardInvite workspace={workspace} />}
            <MenuItem as={RouterLink} to={`${workspace.id}/contributors`}>
              <SettingsIcon mr={4} /> Contributors
            </MenuItem>
            <MenuCardCopy workspace={workspace} />
            <MenuItem>Delete</MenuItem>
          </MenuList>
        </Menu>
      </Td>
    </Tr>
  )
}

export default WorkspaceRecord
