import React from 'react'
import { Box, Flex } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

import { MenuBar } from '../../MenuBar'

import classes from './WorkspaceLayout.module.scss'

export function WorkspaceLayout(): JSX.Element {
  return (
    <Flex className={classes.layout}>
      <MenuBar />
      <Box flex="1">
        <Outlet />
      </Box>
    </Flex>
  )
}

export default WorkspaceLayout
