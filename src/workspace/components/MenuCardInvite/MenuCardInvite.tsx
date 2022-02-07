import React, { useState } from 'react'
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  MenuItem,
  Spacer,
  Stack,
  useDisclosure,
} from '@chakra-ui/react'
import { PlusSquareIcon, SearchIcon } from '@chakra-ui/icons'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { produce } from 'immer'

import { WorkspaceType } from '../../schemas/Workspace'
import { ModalWindow, Pagination } from '../../../common/components'
import {
  getUsers,
  Form,
  Fail,
  FormType,
  ResponseType,
} from '../../api/getUsers'
import { useToast } from '../../../common/hooks'
import { InviteCard } from '../InviteCard'

interface MenuCardInviteProps {
  workspace: WorkspaceType
}

export function MenuCardInvite(props: MenuCardInviteProps): JSX.Element {
  const { workspace } = props
  const { onOpen, onClose, isOpen } = useDisclosure()
  const [, setIsLoading] = useState(false)
  const [users, setUsers] = useState<ResponseType>({
    users: [],
    navigation: {
      first: 0,
      last: 0,
      current: 0,
      next: null,
      previous: null,
    },
    count: 0,
  })
  const runToast = useToast()
  const { control, handleSubmit, setValue } = useForm({
    resolver: zodResolver(Form),
    defaultValues: {
      search: '',
      page: 0,
      pagination: '10',
      workspaceId: workspace.id,
    },
  })

  const onSubmit = handleSubmit<FormType>(async (data) => {
    setIsLoading(true)
    try {
      const response = await getUsers(data)
      setUsers(
        produce((draft) => {
          draft.users = response.users
          draft.navigation = response.navigation
          draft.count = response.count
        })
      )
    } catch (error) {
      const fail = Fail.parse(error)
      runToast(fail, 'Error', 'error')
    }
    setIsLoading(false)
  })

  const onSearch = (
    _event: React.ChangeEvent<HTMLInputElement>,
    onChange: (..._event: any[]) => void
  ) => {
    setValue('page', 0)
    onChange(_event)
  }

  const onPageChange = (page: number) => {
    setValue('page', page)
    onSubmit()
  }

  return (
    <>
      <MenuItem onClick={onOpen}>
        <PlusSquareIcon mr={4} /> Invite
      </MenuItem>
      <ModalWindow size="xl" title="Invite" onClose={onClose} isOpen={isOpen}>
        <Box as="form" mb={5} onSubmit={onSubmit}>
          <Flex gap={2}>
            <Controller
              name="search"
              control={control}
              render={({ field }) => (
                <InputGroup size="md">
                  <InputLeftElement pointerEvents="none">
                    <SearchIcon />
                  </InputLeftElement>
                  <Input
                    placeholder="Search..."
                    ref={field.ref}
                    value={field.value}
                    onChange={(event) => onSearch(event, field.onChange)}
                  />
                </InputGroup>
              )}
            />
            <Button size="md" type="submit">
              search
            </Button>
          </Flex>
        </Box>
        <Stack>
          {users.users.map((user) => (
            <InviteCard key={user.id} user={user} workspace={workspace} />
          ))}
        </Stack>
        <Flex mt={5}>
          <Spacer />
          <Pagination onChange={onPageChange} {...users.navigation} />
        </Flex>
      </ModalWindow>
    </>
  )
}

export default MenuCardInvite
