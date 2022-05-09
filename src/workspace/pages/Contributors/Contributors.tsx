import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
} from '@chakra-ui/react'

import { StrapSkeleton } from 'common/components'
import { ContributorStrap } from 'workspace/components'
import { useWorkspace } from 'workspace/api/useWorkspace'
import { useAuth } from 'common/store'
import { useWorkspaceQuery } from 'workspace/store'

export function Contributors(): JSX.Element {
  const navigate = useNavigate()
  const { workspaceId } = useParams()
  const user = useAuth((state) => state.user)
  const lastQuery = useWorkspaceQuery((store) => store.q)
  const { data, isFetched } = useWorkspace({ _id: workspaceId ?? '' })

  return (
    <Modal isOpen={true} onClose={() => navigate(`/workspace${lastQuery}`)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Contributors</ModalHeader>
        <ModalCloseButton />
        <ModalBody mb={4}>
          <Stack>
            <StrapSkeleton amount={10} isLoaded={isFetched}>
              {data?.contributors.map((contributor) => (
                <ContributorStrap
                  isOwner={data.author._id === user?._id}
                  key={contributor._id}
                  contributor={contributor}
                  workspaceId={data._id}
                />
              ))}
            </StrapSkeleton>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default Contributors
