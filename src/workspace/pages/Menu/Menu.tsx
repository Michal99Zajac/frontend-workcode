import React, { useEffect, useState } from 'react'
import {
  Stack,
  Flex,
  Spacer,
  Heading,
  Box,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  useColorModeValue,
} from '@chakra-ui/react'

import { getWorkspaces, Fail } from '../../api/getWorkspaces'
import {
  CreateWorkspace,
  WorkspaceRecord,
  TableRecordSkeleton,
} from '../../components'
import { WorkspaceType } from '../../schemas'
import { useToast } from '../../../common/hooks'
import { useAuth } from '../../../common/store'
import { WorkspacesProvider } from '../../context/Workspaces'
import { Surface } from '../../../common/components'

export function Menu(): JSX.Element {
  // TODO: add skeletons and remove unused components
  const runToast = useToast()
  const userId = useAuth((state) => state.user?.id)
  const [isLoading, setIsLoading] = useState(true)
  const [workspaces, setWorkspaces] = useState<WorkspaceType[]>([])
  const tableHeaderBG = useColorModeValue('blue.700', 'blue.200')
  const tableHeaderColor = useColorModeValue('white', 'gray.800')

  const fetchWorkspaces = async () => {
    setIsLoading(true)

    if (!userId) throw new Error('User is not authenticated')

    try {
      const response = await getWorkspaces()
      setWorkspaces(response.workspaces)
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
    <Box h="100%" w="100%">
      <WorkspacesProvider workspaces={workspaces} setWorkspaces={setWorkspaces}>
        <Stack p={5} spacing={5} h="100%">
          <Flex align="flex-start">
            <Heading fontSize="8xl">Workspaces</Heading>
            <Spacer />
            <CreateWorkspace />
          </Flex>
          <Surface p={0} flexGrow={1} overflow="auto">
            <Table size="lg" colorScheme="whiteAlpha">
              <Thead
                bg={tableHeaderBG}
                position="sticky"
                top={0}
                zIndex="banner"
              >
                <Tr>
                  <Th color={tableHeaderColor} w="25%" maxW="25%">
                    Title
                  </Th>
                  <Th color={tableHeaderColor} w="auto">
                    Code
                  </Th>
                  <Th color={tableHeaderColor} w="20%">
                    Owner
                  </Th>
                  <Th color={tableHeaderColor} w="25%">
                    Contributors
                  </Th>
                  <Th color={tableHeaderColor} isNumeric w="auto">
                    Created At
                  </Th>
                  <Th color={tableHeaderColor} isNumeric w="auto">
                    Action
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                <TableRecordSkeleton
                  isLoaded={!isLoading}
                  amount={16}
                  columns={6}
                >
                  {workspaces.map((workspace) => (
                    <WorkspaceRecord
                      key={workspace.id}
                      isOwner={workspace.admin.id === userId}
                      workspace={workspace}
                    />
                  ))}
                </TableRecordSkeleton>
              </Tbody>
            </Table>
          </Surface>
        </Stack>
      </WorkspacesProvider>
    </Box>
  )
}

export default Menu
