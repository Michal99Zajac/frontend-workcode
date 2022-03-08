import React, { useCallback, useEffect, useState } from 'react'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
} from '@chakra-ui/react'

import { ContributorStrap, StrapSkeleton } from '../../components'
import { Workspace } from '../../schemas/Workspace'
import { getWorkspace, Fail } from '../../api/getWorkspace'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../../common/store'
import { useWorkspaceFetch, useWorkspaceQuery } from '../../store'

export function Contributors(): JSX.Element {
  const navigate = useNavigate()
  const { workspaceId } = useParams()
  const user = useAuth((state) => state.user)
  const refetchWorkspaces = useWorkspaceFetch((store) => store.refetch)
  const lastQuery = useWorkspaceQuery((store) => store.q)
  const [isLoading, setIsLoading] = useState(true)
  const [workspace, setWorkspace] = useState<Workspace | null>()

  const fetchWorkspace = useCallback(async () => {
    setIsLoading(true)

    if (!workspaceId) throw new Error('Workspace Id is not set')

    try {
      const response = await getWorkspace({ workspaceId: workspaceId })
      setWorkspace(response.workspace)
    } catch (error) {
      const fail = Fail.parse(error)
      console.error(fail)
    }
    setIsLoading(false)
  }, [workspaceId])

  const onClose = () => {
    refetchWorkspaces && refetchWorkspaces()
    navigate(`/workspace${lastQuery}`)
  }

  useEffect(() => {
    fetchWorkspace()
  }, [])

  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Contributors</ModalHeader>
        <ModalCloseButton />
        <ModalBody mb={4}>
          <Stack>
            <StrapSkeleton amount={10} isLoaded={!isLoading}>
              {workspace?.contributors.map((contributor) => (
                <ContributorStrap
                  isOwner={workspace.admin.id === user?.id}
                  key={contributor.id}
                  contributor={contributor}
                  workspaceId={workspace.id}
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
