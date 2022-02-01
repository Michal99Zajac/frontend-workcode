import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import {
  Flex,
  Box,
  Spacer,
  Stack,
  Heading,
  Text,
  Button,
  Tag,
  TagLabel,
  Skeleton,
} from '@chakra-ui/react'

import { LocationState } from '../../../common/schemas'
import { Caption, AvatarTag } from '../../components'
import { Window, DragPocket } from '../../../common/components'
import { getWorkspace, Fail as GetWorkspaceFail } from '../../api/getWorkspace'
import { accessWorkspace, Fail as AccessFail } from '../../api/accessWorkspace'
import { useToast } from '../../../common/hooks'
import { WorkspaceType } from '../../schemas'

import classes from './Wait.module.scss'

export function Wait(): JSX.Element {
  const waiting = useRef<HTMLHeadingElement>(null)
  const runToast = useToast()
  const navigate = useNavigate()
  const { state } = useLocation()
  const { workspaceId } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [workspace, setWorkspace] = useState<WorkspaceType | null>(null)
  const [isChecking, setIsChecking] = useState(false)

  const checkAccess = async (disablePending?: boolean) => {
    if (!workspaceId) throw new Error('Workspace ID doesnt exists')
    setIsChecking(true)
    try {
      const response = await accessWorkspace({ workspaceId: workspaceId })

      if (response.status === 'READY') {
        runToast(
          { ready: 'You have access to the workspace' },
          'Success',
          'success'
        )
        navigate(`/workspace/editor/${response.id}`)
      }

      if (response.status === 'DENIAL') {
        runToast(
          { denial: 'Admin denialed your request' },
          'Forbbiden',
          'error'
        )
        navigate('/workspace/menu')
      }

      if (!disablePending && response.status === 'PENDING') {
        runToast({ pending: 'Your request is pending' }, 'Pending', 'info')
      }
    } catch (error) {
      const fail = AccessFail.parse(error)
      runToast(fail, 'Error', 'error')
    }
    setIsChecking(false)
  }

  const fetchWorkspace = useCallback(async () => {
    if (!workspaceId) throw new Error('Workspace ID doesnt exists')

    try {
      const response = await getWorkspace({ workspaceId: workspaceId })
      setWorkspace(response.workspace)
      setIsLoading(false)
    } catch (error) {
      const fail = GetWorkspaceFail.parse(error)
      runToast(fail, 'Error', 'error')
      navigate('/workspace/menu')
    }
  }, [workspaceId])

  // fetch data about workspace
  useEffect(() => {
    fetchWorkspace()
  }, [])

  // check access every 10s
  useEffect(() => {
    const interval = setInterval(() => {
      checkAccess(true)
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  // add dots effect
  useEffect(() => {
    let count = 1
    const interval = setInterval(() => {
      count++
      if (waiting.current) {
        waiting.current.innerHTML = 'Waiting' + '.'.repeat((count % 3) + 1)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [waiting.current])

  // check if it is not redirection from workspace
  try {
    const locationState = LocationState.parse(state)

    if (!locationState?.isWorkspacePending)
      return <Navigate to="/workspace/menu" />
  } catch (error) {
    return <Navigate to="/workspace/menu" />
  }

  return (
    <Flex className={classes.page} align="center" p={5} position="relative">
      <Stack alignSelf="flex-start" w="40%" spacing={6}>
        <Heading ref={waiting} size="4xl">
          Waiting...
        </Heading>
        <Text>
          The administrator must give you access to the workspace. Wait for the
          administrator to assign you a role in the workspace.
        </Text>
        <Button
          w="150px"
          size="lg"
          onClick={() => checkAccess()}
          isLoading={isChecking}
        >
          Reload
        </Button>
      </Stack>
      <Spacer />
      <DragPocket>
        <Box position="relative">
          <Window
            title="Workspace Information"
            onClick={() => navigate('/workspace/menu')}
          >
            <Stack w="500px" p={4}>
              <Stack>
                <Caption>Administrator</Caption>
                <Skeleton isLoaded={!isLoading} borderRadius="full">
                  <AvatarTag user={workspace?.admin} />
                </Skeleton>
              </Stack>
              <Stack>
                <Caption>Workspace Name</Caption>
                <Skeleton isLoaded={!isLoading}>
                  <Tag bgColor="purple.400">
                    <TagLabel>{workspace?.name}</TagLabel>
                  </Tag>
                </Skeleton>
              </Stack>
              <Box>
                <Caption>Description</Caption>
                <Skeleton isLoaded={!isLoading} minH="50px">
                  <Text noOfLines={4}>{workspace?.description}</Text>
                </Skeleton>
              </Box>
              <Stack>
                <Caption>Code Type</Caption>
                <Skeleton isLoaded={!isLoading}>
                  <Tag bgColor="yellow.400">{workspace?.code}</Tag>
                </Skeleton>
              </Stack>
            </Stack>
          </Window>
        </Box>
      </DragPocket>
      <Spacer />
    </Flex>
  )
}

export default Wait
