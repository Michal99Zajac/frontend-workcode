import React from 'react'
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
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useParams } from 'react-router-dom'

import { Pagination, StrapSkeleton } from 'common/components'
import { useUsersToInvite, Query } from 'workspace/api/useUsersToInvite'
import { LoseConnection } from 'icons/common'
import { InviteStrap } from 'workspace/components'
import { useWorkspaceQuery } from 'workspace/store'

export function Invite(): JSX.Element {
  const { workspaceId } = useParams()
  const navigate = useNavigate()
  const lastQuery = useWorkspaceQuery((store) => store.q)
  const { control, handleSubmit, setValue, getValues } = useForm<Query>({
    resolver: zodResolver(Query),
    defaultValues: {
      query: '',
      page: 0,
      limit: 2,
    },
  })
  const { isLoading, data } = useUsersToInvite(workspaceId ?? '', getValues())

  const onSubmit = handleSubmit(() => {})

  if (!workspaceId) throw new Error('Workspace ID is not provided')

  return (
    <Modal isOpen={true} onClose={() => navigate(`/workspace${lastQuery}`)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Invite</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box mb={5}>
            <form onSubmit={onSubmit}>
              <Controller
                name="query"
                control={control}
                render={({ field }) => (
                  <InputGroup size="md">
                    <InputLeftElement pointerEvents="none">
                      <SearchIcon />
                    </InputLeftElement>
                    <Input
                      placeholder="Search..."
                      ref={field.ref}
                      onChange={(event) => {
                        field.onChange(event)
                        setValue('page', 0)
                        onSubmit()
                      }}
                    />
                  </InputGroup>
                )}
              />
            </form>
          </Box>
          <Stack>
            <StrapSkeleton amount={10} isLoaded={!isLoading}>
              {data?.pagination.count ? (
                data?.users.map((user) => (
                  <InviteStrap
                    key={user._id}
                    user={user}
                    workspaceId={workspaceId}
                  />
                ))
              ) : (
                <Center flexDirection="column" height="270px">
                  <LoseConnection width={100} height={100} />
                  <Heading mt={5}>No Results</Heading>
                </Center>
              )}
            </StrapSkeleton>
          </Stack>
        </ModalBody>
        <ModalFooter>
          {data?.pagination && (
            <Pagination
              onChange={(page) => {
                setValue('page', page)
                onSubmit()
              }}
              current={getValues('page')}
              next={data.pagination.next}
              previous={data.pagination.previous}
              last={data.pagination.last}
              first={data.pagination.first}
            />
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default Invite
