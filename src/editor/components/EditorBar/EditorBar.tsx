import React from 'react'
import { Flex, Spacer, useColorModeValue } from '@chakra-ui/react'

import { CodeLabel } from '../CodeLabel'
import { ActiveContributors } from '../ActiveContributors'
import { UUID } from '../../../common/schemas'

interface EditorBarProps {
  workspaceId: UUID
}

export function EditorBar(props: EditorBarProps): JSX.Element {
  const { workspaceId } = props
  const barBG = useColorModeValue('gray.100', 'gray.900')

  return (
    <Flex h="22px" minH="22px" alignItems="center" pl={1} bg={barBG}>
      <ActiveContributors
        workspaceId={workspaceId}
        activeContributorsIds={[]}
      />
      <Spacer />
      <CodeLabel type="PYTHON" />
    </Flex>
  )
}

export default EditorBar
