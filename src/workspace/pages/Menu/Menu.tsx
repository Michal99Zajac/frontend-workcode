import React, { useState } from 'react'
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
  IconButton,
  Tooltip,
} from '@chakra-ui/react'
import { Link, Outlet } from 'react-router-dom'
import { AddIcon } from '@chakra-ui/icons'

import { WorkspaceRecord, WorkspaceFilters } from '../../components'
import { Workspace } from '../../schemas'
import { useAuth } from '../../../common/store'
import { Surface, TableRecordSkeleton } from '../../../common/components'

export function Menu(): JSX.Element {
  const userId = useAuth((state) => state.user?.id)
  const [isLoading, setIsLoading] = useState(true)
  const [workspaces, setWorkspaces] = useState<Workspace[]>([])
  const tableHeaderBG = useColorModeValue('blue.700', 'blue.200')
  const tableHeaderColor = useColorModeValue('white', 'gray.800')

  // TODO: add all area link click

  return (
    <Box h="100%" w="100%">
      <Stack p={5} spacing={5} h="100%">
        <Heading fontSize="8xl">Workspaces</Heading>
        <Flex align="center">
          <WorkspaceFilters
            setIsLoading={setIsLoading}
            setWorkspaces={setWorkspaces}
          />
          <Spacer />
          <Tooltip label="Add Workspace" placement="top">
            <IconButton
              size="md"
              aria-label="add workspace"
              icon={<AddIcon />}
              as={Link}
              to="/workspace/create"
            />
          </Tooltip>
        </Flex>
        <Surface p={0} flexGrow={1} overflow="auto">
          <Table size="lg" colorScheme="whiteAlpha">
            <Thead bg={tableHeaderBG} position="sticky" top={0} zIndex="banner">
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
                <Th color={tableHeaderColor} w="20%">
                  Contributors
                </Th>
                <Th color={tableHeaderColor} isNumeric w="max-content">
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
      <Outlet />
    </Box>
  )
}

export default Menu
