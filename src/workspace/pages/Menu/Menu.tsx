import React from 'react'
import {
  Stack,
  Flex,
  Spacer,
  Heading,
  IconButton,
  Box,
  Skeleton,
  Wrap,
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

import classes from './Menu.module.scss'

export function Menu(): JSX.Element {
  return (
    <Stack className={classes.page} p={5} spacing={5}>
      <Flex align="center">
        <Heading fontSize="7xl">Menu</Heading>
        <Spacer />
        <IconButton size="md" aria-label="add workspace" icon={<AddIcon />} />
      </Flex>
      <Box>
        <Heading fontSize="5xl" mb={5}>
          Your Workspaces
        </Heading>
        <Wrap justify="center">
          <Skeleton h="200px" w="300px" />
          <Skeleton h="200px" w="300px" />
          <Skeleton h="200px" w="300px" />
          <Skeleton h="200px" w="300px" />
          <Skeleton h="200px" w="300px" />
          <Skeleton h="200px" w="300px" />
          <Skeleton h="200px" w="300px" />
          <Skeleton h="200px" w="300px" />
        </Wrap>
      </Box>
      <Box>
        <Heading fontSize="5xl" mb={5}>
          Friends Workspaces
        </Heading>
        <Wrap justify="center">
          <Skeleton h="200px" w="300px" />
          <Skeleton h="200px" w="300px" />
          <Skeleton h="200px" w="300px" />
          <Skeleton h="200px" w="300px" />
          <Skeleton h="200px" w="300px" />
          <Skeleton h="200px" w="300px" />
          <Skeleton h="200px" w="300px" />
          <Skeleton h="200px" w="300px" />
        </Wrap>
      </Box>
    </Stack>
  )
}

export default Menu
