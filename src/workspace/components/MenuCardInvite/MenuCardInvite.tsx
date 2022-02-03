import React, { useEffect } from 'react'
import { MenuItem, useDisclosure } from '@chakra-ui/react'
import { PlusSquareIcon } from '@chakra-ui/icons'

import { WorkspaceType } from '../../schemas/Workspace'
import { ModalWindow } from '../../../common/components'
import { getUsers } from '../../api'

interface MenuCardInviteProps {
  workspace: WorkspaceType
}

export function MenuCardInvite(props: MenuCardInviteProps): JSX.Element {
  const { workspace } = props
  const { onOpen, onClose, isOpen } = useDisclosure()

  useEffect(() => {
    getUsers({ search: '' })
  }, [])

  return (
    <>
      <MenuItem onClick={onOpen}>
        <PlusSquareIcon mr={4} /> Invite
      </MenuItem>
      <ModalWindow title="Invite" onClose={onClose} isOpen={isOpen}>
        {workspace.id}
      </ModalWindow>
    </>
  )
}

export default MenuCardInvite
