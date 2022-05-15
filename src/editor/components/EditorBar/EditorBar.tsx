import React from 'react'
import { Flex, Skeleton, Spacer, useColorModeValue } from '@chakra-ui/react'

import {
  CodeLabel,
  ActiveContributors,
  EditorCompas,
  Chat,
} from 'editor/components'
import { useEditor, useEditorSocket, useWorkspace } from 'editor/hooks'

export function EditorBar(): JSX.Element {
  const { cursor } = useEditor()
  const { workspace } = useWorkspace()
  const { actives } = useEditorSocket()
  const barBG = useColorModeValue('gray.100', 'gray.900')

  return (
    <Flex h="22px" minH="22px" alignItems="center" pl={1} bg={barBG}>
      <ActiveContributors
        isLoading={!workspace}
        contributors={
          workspace ? [...workspace.contributors, workspace.author] : []
        }
        activeUsers={actives}
      />
      <Spacer />
      <EditorCompas {...cursor} />
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
