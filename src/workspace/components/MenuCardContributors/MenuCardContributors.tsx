import React from 'react'
import { SettingsIcon } from '@chakra-ui/icons'
import { MenuItem, useDisclosure } from '@chakra-ui/react'

import { ModalWindow } from '../../../common/components'

export function MenuCardContributors(): JSX.Element {
  const { onOpen, onClose, isOpen } = useDisclosure()

  return (
    <>
      <MenuItem onClick={onOpen}>
        <SettingsIcon mr={4} /> Contributors
      </MenuItem>
      <ModalWindow title="Invite" onClose={onClose} isOpen={isOpen}>
        <div>a</div>
      </ModalWindow>
    </>
  )
}

export default MenuCardContributors
