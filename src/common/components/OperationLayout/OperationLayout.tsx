import React from 'react'
import { Box, Flex } from '@chakra-ui/react'

import { MenuBar } from '../MenuBar'

import classes from './OperationLayout.module.scss'

interface OperationLayoutProps {
  children: React.ReactNode
}

export function OperationLayout(props: OperationLayoutProps): JSX.Element {
  const { children } = props
  return (
    <Flex className={classes.layout}>
      <MenuBar />
      <Box flex="1">{children}</Box>
    </Flex>
  )
}

export default OperationLayout
