import React from 'react'
import { SettingsIcon } from '@chakra-ui/icons'
import { MenuItem, Stack, useDisclosure } from '@chakra-ui/react'

import { ContributorSetter } from '../ContributorSetter'
import { ModalWindow } from '../../../common/components'
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
      <ModalWindow title="Contributors" onClose={onClose} isOpen={isOpen}>
        <Stack maxH="75vh" overflow="auto" px={2}>
          {workspace.contributors.map((contributor) => (
            <ContributorSetter
              key={contributor.id}
              contributor={contributor}
              setContributor={(c) => alert(JSON.stringify(c))}
            />
          ))}
        </Stack>
      </ModalWindow>
    </>
  )
}

export default MenuCardContributors
