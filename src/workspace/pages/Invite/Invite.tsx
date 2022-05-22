import React, { useState, useEffect, useCallback } from 'react'
import {
  Box,
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
import { useNavigate, useParams } from 'react-router-dom'
import { produce } from 'immer'
import _ from 'lodash'
import { useTranslation } from 'react-i18next'

import { Pagination, StrapSkeleton } from 'common/components'
import { useUsersToInvite, Query } from 'workspace/api/useUsersToInvite'
import { NotFoundIcon } from 'icons/common'
import { InviteStrap } from 'workspace/components'
import { useWorkspaceQuery } from 'workspace/store'
import { useMode } from 'common/hooks'

export function Invite(): JSX.Element {
  const mode = useMode()
  const { workspaceId } = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const lastQuery = useWorkspaceQuery((store) => store.q)
  const [query, setQuery] = useState<Query>({
    query: '',
    page: 0,
    limit: 5,
  })
  const { isLoading, data, refetch, isFetched } = useUsersToInvite(
    workspaceId ?? '',
    query,
    true
  )

  const fetch = useCallback(
    _.debounce(async () => {
      await refetch()
    }, 500),
    []
  )

  // wait 500ms after next api call
  useEffect(() => {
    fetch()
  }, [query.query])

  // refetch after every page change
  useEffect(() => {
    refetch()
  }, [query.page])

  if (!workspaceId) throw new Error('Workspace ID is not provided')

  return (
    <Modal isOpen={true} onClose={() => navigate(`/workspace${lastQuery}`)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('workspace.pages.invite.header')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody minH="360px">
          <Box mb={5}>
            <form onSubmit={(_e) => _e.preventDefault()}>
              <InputGroup size="md">
                <InputLeftElement pointerEvents="none">
                  <SearchIcon />
                </InputLeftElement>
                <Input
                  placeholder={t('workspace.pages.invite.input.placeholder')}
                  value={query.query}
                  onChange={(event) => {
                    setQuery(
                      produce((draft) => {
                        draft.query = event.target.value
                        draft.page = 0
                      })
                    )
                  }}
                />
              </InputGroup>
            </form>
          </Box>
          <Stack>
            <StrapSkeleton amount={5} isLoaded={!isLoading && isFetched}>
              {data?.pagination.count ? (
                data?.users.map((user) => (
                  <InviteStrap
                    key={user._id}
                    user={user}
                    workspaceId={workspaceId}
                  />
                ))
              ) : (
                <Stack align="center">
                  <NotFoundIcon
                    fill={mode('black', 'white')}
                    fontSize="150px"
                  />
                  <Heading size="lg">
                    {t('workspace.pages.invite.not_found.heading')}
                  </Heading>
                </Stack>
              )}
            </StrapSkeleton>
          </Stack>
        </ModalBody>
        <ModalFooter>
          {data?.pagination && (
            <Pagination
              onChange={(page) => {
                setQuery(
                  produce((draft) => {
                    draft.page = page
                  })
                )
              }}
              current={query.page}
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
