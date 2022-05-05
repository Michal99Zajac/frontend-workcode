import React from 'react'
import { Box, Flex } from '@chakra-ui/react'

import { MenuBar } from 'common/components'

import classes from './WorkspaceLayout.module.scss'

type PageType = () => JSX.Element

export const WorkspaceLayout =
  (Page: PageType): PageType =>
  () =>
    (
      <Flex className={classes.layout}>
        <MenuBar />
        <Box flex="1">
          <Page />
        </Box>
      </Flex>
    )

export default WorkspaceLayout
