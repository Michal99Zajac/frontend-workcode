import React from 'react'
import { SettingsIcon } from '@chakra-ui/icons'
import {
  MenuItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
} from '@chakra-ui/react'

import { ContributorStrap } from '../ContributorStrap'
import { WorkspaceType } from '../../schemas/Workspace'

interface MenuCardContributorsProps {
  workspace: WorkspaceType
}

export function MenuCardContributors(
  props: MenuCardContributorsProps
): JSX.Element {
  const { workspace } = props
  const { onOpen, onClose, isOpen } = useDisclosure()

  return (
    <>
      <MenuItem onClick={onOpen}>
        <SettingsIcon mr={4} /> Contributors
      </MenuItem>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Contributors</ModalHeader>
          <ModalCloseButton />
          <ModalBody mb={4}>
            <Stack>
              {workspace.contributors.map((contributor) => (
                <ContributorStrap
                  key={contributor.id}
                  contributor={contributor}
                />
              ))}
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default MenuCardContributors
