import React, { useState } from 'react'
import { produce } from 'immer'
import {
  Stack,
  Flex,
  Spacer,
  Heading,
  Box,
  Skeleton,
  Wrap,
} from '@chakra-ui/react'

import { CreateWorkspace, WorkspaceCard } from '../../components'
import { WorkspaceType } from '../../schemas'

import classes from './Menu.module.scss'

export function Menu(): JSX.Element {
  const [workspaces, setWorkspaces] = useState<WorkspaceType[]>([])

  const addWorkspace = (workspace: WorkspaceType) => {
    setWorkspaces(
      produce((draft) => {
        draft.push(workspace)
      })
    )
  }

  return (
    <Stack className={classes.page} p={5} spacing={5}>
      <Flex align="center">
        <Heading fontSize="7xl">Menu</Heading>
        <Spacer />
        <CreateWorkspace addWorkspaces={addWorkspace} />
      </Flex>
      <Box>
        <Heading fontSize="5xl" mb={5}>
          Your Workspaces
        </Heading>
        <Wrap spacing={6}>
          {workspaces.map((workspace) => (
            <WorkspaceCard key={workspace.id} workspace={workspace} />
          ))}
        </Wrap>
      </Box>
      <Box>
        <Heading fontSize="5xl" mb={5}>
          Friends Workspaces
        </Heading>
        <Wrap spacing={6}>
          <Skeleton h="200px" w="300px" />
          <Skeleton h="200px" w="300px" />
          <Skeleton h="200px" w="300px" />
          <Skeleton h="200px" w="300px" />
        </Wrap>
      </Box>
    </Stack>
  )
}

export default Menu
