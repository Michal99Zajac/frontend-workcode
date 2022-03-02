import React, { useEffect, useState } from 'react'
import {
  Box,
  Center,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { produce } from 'immer'
import { useNavigate, useParams } from 'react-router-dom'

import { Pagination } from '../../../common/components'
import {
  getUsers,
  Form,
  Fail,
  FormType,
  ResponseType,
} from '../../api/getUsers'
import { useToast } from '../../../common/hooks'
import { LoseConnection } from '../../../icons/common'
import { StrapSkeleton, InviteStrap } from '../../components'

export function Invite(): JSX.Element {
  const { workspaceId } = useParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
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
      workspaceId: workspaceId,
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

  if (!workspaceId) throw new Error('Workspace ID is not provided')

  return (
    <Modal isOpen={true} onClose={() => navigate('/workspace')}>
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
                    workspaceId={workspaceId}
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
  )
}

export default Invite
