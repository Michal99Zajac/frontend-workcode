import React from 'react'
import {
  CopyIcon,
  DeleteIcon,
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
  useColorModeValue,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import { useWorkspaceCopy } from 'workspace/hooks'
import {
  useWorkspaceDelete as useDelete,
  useWorkspaceLeave as leaving,
} from 'workspace/api'
import { LeaveIcon } from 'icons/common'

interface RecordMenuProps {
  workspaceId: string
  isOwner?: boolean
}

export function RecordMenu(props: RecordMenuProps): JSX.Element {
  const { workspaceId, isOwner } = props
  const fill = useColorModeValue('black', 'white')
  const [copy, hasCopied] = useWorkspaceCopy(workspaceId)
  const deletion = useDelete.useWorkspaceDelete({ workspaceId })
  const leave = leaving.useWorkspaceLeave({ workspaceId })

  return (
    <Menu>
      <MenuButton
        isLoading={deletion.isLoading || leave.isLoading}
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
        {isOwner ? (
          <MenuItem
            _hover={{
              bg: 'red.500',
            }}
            onClick={() => deletion.mutate()}
          >
            <DeleteIcon mr={4} /> Delete
          </MenuItem>
        ) : (
          <MenuItem
            _hover={{
              bg: 'red.500',
            }}
            onClick={() => leave.mutate()}
          >
            <LeaveIcon fill={fill} mr={4} /> Leave
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  )
}

export default RecordMenu
