import React, { useEffect } from 'react'
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
  Center,
} from '@chakra-ui/react'
import { Link, Outlet } from 'react-router-dom'
import { AddIcon } from '@chakra-ui/icons'
import { zodResolver } from '@hookform/resolvers/zod'

import { useWorkspaces, Form } from 'workspace/api/useWorkspaces'
import {
  WorkspaceRecord,
  WorkspaceFilters,
  NoWorkspaces,
} from 'workspace/components'
import { useAuth } from 'common/store'
import { Surface, TableRecordSkeleton } from 'common/components'
import { useQueryForm } from 'common/hooks'
import { useWorkspaceQuery } from 'workspace/store'

export function Menu(): JSX.Element {
  const tableHeaderBG = useColorModeValue('blue.500', 'blue.200')
  const tableHeaderColor = useColorModeValue('white', 'gray.800')

  const updateQuery = useWorkspaceQuery((store) => store.update)
  const userId = useAuth((state) => state.user?._id)
  const filters = useQueryForm<Form>({
    resolver: zodResolver(Form),
    schema: Form,
    defaultValues: {
      self: false,
      name: '',
      owner: '',
      code: 'ALL',
    },
  })
  const { data, isFetching, refetch } = useWorkspaces(filters.getValues())
  const workspaces = data

  const onSubmit = (data: Form) => {
    updateQuery(data)
    refetch()
  }

  // update query on the start of app
  useEffect(() => {
    updateQuery(filters.getValues())
  }, [])

  // TODO: add all area link click

  return (
    <Box h="100%" w="100%">
      <Stack p={5} spacing={5} h="100%">
        <Heading fontSize="8xl">Workspaces</Heading>
        <Flex align="center">
          <WorkspaceFilters form={filters} onSubmit={onSubmit} />
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
            <Tbody position="relative">
              <TableRecordSkeleton
                isLoaded={!isFetching}
                amount={16}
                columns={6}
              >
                {workspaces?.map((workspace) => (
                  <WorkspaceRecord
                    key={workspace._id}
                    isOwner={workspace.author._id === userId}
                    workspace={workspace}
                  />
                ))}
              </TableRecordSkeleton>
              {!isFetching && !workspaces?.length && (
                <Center
                  height="400px"
                  position="absolute"
                  left="0"
                  right="0"
                  marginLeft="auto"
                  marginRight="auto"
                >
                  <NoWorkspaces />
                </Center>
              )}
            </Tbody>
          </Table>
        </Surface>
      </Stack>
      <Outlet />
    </Box>
  )
}

export default Menu
