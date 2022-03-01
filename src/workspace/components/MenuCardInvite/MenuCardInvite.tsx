import React, { useEffect, useState } from 'react'
import {
  Box,
  Center,
  Input,
  InputGroup,
  InputLeftElement,
  MenuItem,
  Stack,
  useDisclosure,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react'
import { PlusSquareIcon, SearchIcon } from '@chakra-ui/icons'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { produce } from 'immer'

import { WorkspaceType } from '../../schemas/Workspace'
import { Pagination } from '../../../common/components'
import {
  getUsers,
  Form,
  Fail,
  FormType,
  ResponseType,
} from '../../api/getUsers'
import { useToast } from '../../../common/hooks'
import { InviteStrap } from '../InviteStrap'
import { LoseConnection } from '../../../icons/common'
import { StrapSkeleton } from '../Skeletons'

interface MenuCardInviteProps {
  workspace: WorkspaceType
}

export function MenuCardInvite(props: MenuCardInviteProps): JSX.Element {
  const { workspace } = props
  const { onOpen, onClose, isOpen } = useDisclosure()
  const [isLoading, setIsLoading] = useState(false)
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
  const { control, handleSubmit, setValue, watch } = useForm({
    resolver: zodResolver(Form),
    defaultValues: {
      search: '',
      page: 0,
      pagination: '10',
      workspaceId: workspace.id,
    },
  })
  const search = watch('search', '')

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

  useEffect(() => {
    const timeout = setTimeout(() => {
      onSubmit()
    }, 500)

    return () => clearTimeout(timeout)
  }, [search])

  return (
    <>
      <MenuItem onClick={onOpen}>
        <PlusSquareIcon mr={4} /> Invite
      </MenuItem>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Invite</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box mb={5}>
              <form onSubmit={onSubmit}>
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
              </form>
            </Box>
            {users.users.length > 0 ? (
              <Stack>
                <StrapSkeleton amount={10} isLoaded={!isLoading}>
                  {users.users.map((user) => (
                    <InviteStrap
                      key={user.id}
                      user={user}
                      workspace={workspace}
                    />
                  ))}
                </StrapSkeleton>
              </Stack>
            ) : (
              <Center flexDirection="column" height="270px">
                <LoseConnection width={100} height={100} />
                <Heading mt={5}>No Results</Heading>
              </Center>
            )}
          </ModalBody>
          <ModalFooter>
            <Pagination onChange={onPageChange} {...users.navigation} />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default MenuCardInvite
