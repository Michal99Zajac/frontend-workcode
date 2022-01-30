import React from 'react'
import { IconButton, useDisclosure } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

import { ModalWindow } from '../../../common/components'

export function CreateWorkspace(): JSX.Element {
  const { onOpen, onClose, isOpen } = useDisclosure()

  return (
    <>
      <IconButton
        size="md"
        aria-label="add workspace"
        icon={<AddIcon />}
        onClick={onOpen}
      />
      <ModalWindow title="Create Workspace" onClose={onClose} isOpen={isOpen}>
        aa
      </ModalWindow>
    </>
  )
}

export default CreateWorkspace
