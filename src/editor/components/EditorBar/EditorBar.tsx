import React from 'react'
import { Flex, Spacer } from '@chakra-ui/react'

import { CodeLabel } from '../CodeLabel'
import { ActiveContributors } from '../ActiveContributors'

export function EditorBar(): JSX.Element {
  return (
    <Flex h="22px" minH="22px" alignItems="center" pl={1} bg="gray.900">
      <ActiveContributors />
      <Spacer />
      <CodeLabel type="PYTHON" />
    </Flex>
  )
}

export default EditorBar
