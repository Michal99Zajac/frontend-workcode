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
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation()
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
            <EditIcon mr={4} />{' '}
            {t('workspace.components.record_menu.menu.update')}
          </MenuItem>
        )}
        {isOwner && (
          <MenuItem as={Link} to={`${workspaceId}/invite`}>
            <PlusSquareIcon mr={4} />{' '}
            {t('workspace.components.record_menu.menu.invite')}
          </MenuItem>
        )}
        <MenuItem as={Link} to={`${workspaceId}/contributors`}>
          <SettingsIcon mr={4} />{' '}
          {t('workspace.components.record_menu.menu.contributors')}
        </MenuItem>
        <MenuItem onClick={copy}>
          <CopyIcon mr={4} />{' '}
          {!hasCopied
            ? t('workspace.components.record_menu.menu.copy.before')
            : t('workspace.components.record_menu.menu.copy.after')}
        </MenuItem>
        {isOwner ? (
          <MenuItem
            _hover={{
              bg: 'red.500',
            }}
            onClick={() => deletion.mutate()}
          >
            <DeleteIcon mr={4} />{' '}
            {t('workspace.components.record_menu.menu.delete')}
          </MenuItem>
        ) : (
          <MenuItem
            _hover={{
              bg: 'red.500',
            }}
            onClick={() => leave.mutate()}
          >
            <LeaveIcon fill={fill} mr={4} />{' '}
            {t('workspace.components.record_menu.menu.leave')}
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  )
}

export default RecordMenu
