import {
  CopyIcon,
  EditIcon,
  HamburgerIcon,
  PlusSquareIcon,
  SettingsIcon,
} from '@chakra-ui/icons'
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

import { useWorkspaceCopy } from '../../hooks'

interface RecordMenuProps {
  workspaceId: string
  isOwner?: boolean
}

export function RecordMenu(props: RecordMenuProps): JSX.Element {
  const { workspaceId, isOwner } = props
  const [copy, hasCopied] = useWorkspaceCopy(workspaceId)

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        variant="ghost"
        colorScheme="gray"
        icon={<HamburgerIcon />}
        size="sm"
      />
      <MenuList>
        {isOwner && (
          <MenuItem as={Link} to={`${workspaceId}/update`}>
            <EditIcon mr={4} /> Update
          </MenuItem>
        )}
        {isOwner && (
          <MenuItem as={Link} to={`${workspaceId}/invite`}>
            <PlusSquareIcon mr={4} /> Invite
          </MenuItem>
        )}
        <MenuItem as={Link} to={`${workspaceId}/contributors`}>
          <SettingsIcon mr={4} /> Contributors
        </MenuItem>
        <MenuItem onClick={copy}>
          <CopyIcon mr={4} /> {!hasCopied ? 'Copy Link' : 'Copied'}
        </MenuItem>
        <MenuItem>Delete</MenuItem>
      </MenuList>
    </Menu>
  )
}

export default RecordMenu
