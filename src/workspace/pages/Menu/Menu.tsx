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
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  HStack,
  Checkbox,
} from '@chakra-ui/react'
import { Link, Outlet, useLocation, useSearchParams } from 'react-router-dom'
import { AddIcon, SearchIcon } from '@chakra-ui/icons'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  getWorkspaces,
  Fail,
  Form,
  FormType,
  FormCode,
  FormCodeType,
} from '../../api/getWorkspaces'
import { WorkspaceRecord, TableRecordSkeleton } from '../../components'
import { WorkspaceType } from '../../schemas'
import { useToast } from '../../../common/hooks'
import { useAuth } from '../../../common/store'
import { FilterSelect, Surface } from '../../../common/components'

export function Menu(): JSX.Element {
  const runToast = useToast()
  const [search, setSearch] = useSearchParams(
    new URLSearchParams({
      self: 'false',
      workspace: '',
      owner: '',
      code: FormCode.enum.ALL,
    })
  )
  const location = useLocation()
  const userId = useAuth((state) => state.user?.id)
  const [isLoading, setIsLoading] = useState(true)
  const [workspaces, setWorkspaces] = useState<WorkspaceType[]>([])
  const tableHeaderBG = useColorModeValue('blue.700', 'blue.200')
  const tableHeaderColor = useColorModeValue('white', 'gray.800')
  const { handleSubmit, control, setValue } = useForm({
    resolver: zodResolver(Form),
    defaultValues: {
      self: search.get('self') === 'true' ? true : false,
      workspace: search.get('workspace') || '',
      owner: search.get('owner') || '',
      code: search.get('code') || FormCode.enum.ALL,
    },
  })

  const onSubmit = handleSubmit<FormType>(async (data) => {
    setIsLoading(true)

    if (!userId) throw new Error('User is not authenticated')

    try {
      const response = await getWorkspaces(data)
      setSearch(
        new URLSearchParams({
          workspace: data.workspace,
          self: data.self.toString(),
          owner: data.owner,
          code: data.code,
        })
      )
      setWorkspaces(response.workspaces)
    } catch (error) {
      const fail = Fail.parse(error)
      runToast(fail, 'Error', 'error')
    }
    setIsLoading(false)
  })

  useEffect(() => {
    onSubmit()
  }, [location.pathname])

  return (
    <Box h="100%" w="100%">
      <Stack p={5} spacing={5} h="100%">
        <Heading fontSize="8xl">Workspaces</Heading>
        <form onSubmit={onSubmit}>
          <Flex align="center">
            <HStack>
              <Button type="submit">search</Button>
              <Controller
                name="workspace"
                control={control}
                render={({ field }) => (
                  <InputGroup w="min-content">
                    <InputLeftElement>
                      <SearchIcon />
                    </InputLeftElement>
                    <Input
                      {...field}
                      placeholder="Workspace"
                      transition="all 0.3s"
                      w="10vw"
                      sx={{
                        '&:focus': {
                          width: '25vw',
                        },
                      }}
                    />
                  </InputGroup>
                )}
              />
              <Controller
                name="owner"
                control={control}
                render={({ field }) => (
                  <InputGroup w="min-content">
                    <InputLeftElement>
                      <SearchIcon />
                    </InputLeftElement>
                    <Input
                      {...field}
                      placeholder="Owner"
                      transition="all 0.3s"
                      w="10vw"
                      sx={{
                        '&:focus': {
                          width: '25vw',
                        },
                      }}
                    />
                  </InputGroup>
                )}
              />
              <Controller
                name="code"
                control={control}
                render={({ field }) => (
                  <InputGroup w="min-content">
                    <FilterSelect
                      placeholder="Owner"
                      transition="all 0.3s"
                      identifer="value"
                      options={FormCode.options.map((option) => ({
                        value: option,
                      }))}
                      onChange={(option) =>
                        setValue('code', option.value as FormCodeType)
                      }
                      value={{
                        value: FormCode.options.find(
                          (option) => field.value === option
                        ),
                      }}
                      w="260px"
                    />
                  </InputGroup>
                )}
              />
              <Controller
                name="self"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    size="lg"
                    isChecked={field.value}
                    onChange={() => setValue('self', !field.value)}
                  >
                    only my
                  </Checkbox>
                )}
              />
            </HStack>
            <Spacer />
            <IconButton
              size="md"
              aria-label="add workspace"
              icon={<AddIcon />}
              as={Link}
              to="/workspace/create"
            />
          </Flex>
        </form>
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
