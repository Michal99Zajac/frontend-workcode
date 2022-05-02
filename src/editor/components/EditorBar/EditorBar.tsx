import React from 'react'
import { Flex, Skeleton, Spacer, useColorModeValue } from '@chakra-ui/react'

import { CodeLabel } from '../CodeLabel'
import { ActiveContributors } from '../ActiveContributors'
import { EdiorCompas } from '../EditorCompas'
import { useEditor, useWorkspace } from '../../hooks'
import Chat from '../Chat'

export function EditorBar(): JSX.Element {
  const { cursor } = useEditor()
  const { isLoading, workspace } = useWorkspace()
  const barBG = useColorModeValue('gray.100', 'gray.900')

  return (
    <Flex h="22px" minH="22px" alignItems="center" pl={1} bg={barBG}>
      <ActiveContributors
        isLoading={isLoading}
        contributors={workspace?.contributors || []}
        activeContributorsIds={[]}
      />
      <Spacer />
      <EdiorCompas {...cursor} />
      <Chat />
      {workspace?.code ? (
        <CodeLabel type={workspace.code} />
      ) : (
        <Skeleton w="80px" h="100%" />
      )}
    </Flex>
  )
}

export default EditorBar
