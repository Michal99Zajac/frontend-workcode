import React, { useEffect, useState } from 'react'
import { produce } from 'immer'
import { Stack, Flex, Spacer, Heading, Box, Wrap } from '@chakra-ui/react'

import { getWorkspaces, Fail } from '../../api/getWorkspaces'
import {
  CreateWorkspace,
  WorkspaceCard,
  WorkspaceCardGhosts,
} from '../../components'
import { WorkspaceType } from '../../schemas'
import { useToast } from '../../../common/hooks'
import { splitWorkspaces } from '../../utils'
import { useAuth } from '../../../common/store'
import { Workspaces, WorkspacesProvider } from '../../context/Workspaces'

import classes from './Menu.module.scss'

export function Menu(): JSX.Element {
  const runToast = useToast()
  const userId = useAuth((state) => state.user?.id)
  const [isLoading, setIsLoading] = useState(true)
  const [workspaces, setWorkspaces] = useState<Workspaces>({
    my: [],
    other: [],
  })

  const setMyWorkspaces = (workspaces: WorkspaceType[]) => {
    setWorkspaces(
      produce((draft) => {
        draft.my = workspaces
      })
    )
  }

  const setOtherWorkspaces = (workspaces: WorkspaceType[]) => {
    setWorkspaces(
      produce((draft) => {
        draft.other = workspaces
      })
    )
  }

  const fetchWorkspaces = async () => {
    setIsLoading(true)

    if (!userId) throw new Error('User is not authenticated')

    try {
      const response = await getWorkspaces()
      setWorkspaces(splitWorkspaces(response.workspaces, userId))
    } catch (error) {
      const fail = Fail.parse(error)
      runToast(fail, 'Error', 'error')
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchWorkspaces()
  }, [])

  return (
    <WorkspacesProvider
      workspaces={workspaces}
      setMyWorkspaces={setMyWorkspaces}
      setOtherWorkspaces={setOtherWorkspaces}
    >
      <Stack className={classes.page} p={5} spacing={5}>
        <Flex align="center">
          <Heading fontSize="7xl">Menu</Heading>
          <Spacer />
          <CreateWorkspace />
        </Flex>
        <Box>
          <Heading fontSize="5xl" mb={5}>
            Your Workspaces
          </Heading>
          <Wrap spacing={6}>
            <WorkspaceCardGhosts amount={3} isLoaded={!isLoading}>
              {workspaces.my.map((workspace) => (
                <WorkspaceCard
                  key={workspace.id}
                  isAdmin
                  workspace={workspace}
                />
              ))}
            </WorkspaceCardGhosts>
          </Wrap>
        </Box>
        <Box>
          <Heading fontSize="5xl" mb={5}>
            Friends Workspaces
          </Heading>
          <Wrap spacing={6}>
            <WorkspaceCardGhosts amount={4} isLoaded={!isLoading}>
              {workspaces.other.map((workspace) => (
                <WorkspaceCard key={workspace.id} workspace={workspace} />
              ))}
            </WorkspaceCardGhosts>
          </Wrap>
        </Box>
      </Stack>
    </WorkspacesProvider>
  )
}

export default Menu
