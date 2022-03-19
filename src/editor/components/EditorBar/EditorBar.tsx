import React from 'react'
import { Flex, Spacer } from '@chakra-ui/react'

import { CodeLabel } from '../CodeLabel'
import { ActiveContributors } from '../ActiveContributors'
import { UUID } from '../../../common/schemas'

interface EditorBarProps {
  workspaceId: UUID
}

export function EditorBar(props: EditorBarProps): JSX.Element {
  const { workspaceId } = props

  return (
    <Flex h="22px" minH="22px" alignItems="center" pl={1} bg="gray.900">
      <ActiveContributors
        workspaceId={workspaceId}
        activeContributorsIds={[
          'dc92e178-d4e1-423d-b47a-709a7a098931',
          '146a8723-035a-4ae9-bf4e-b41d05cdff3b',
        ]}
      />
      <Spacer />
      <CodeLabel type="PYTHON" />
    </Flex>
  )
}

export default EditorBar
