import React from 'react'
import { Box, Container, Heading, Stack } from '@chakra-ui/react'

import { BasicSetting } from 'common/components'
import {
  DeleteAccount,
  UserDataUpdate,
  PasswordUpdate,
} from 'config/components'

import classes from './UserConfig.module.scss'

export function UserConfig(): JSX.Element {
  return (
    <Box className={classes.page}>
      <Container maxW="container.md" py={5}>
        <Stack spacing={8}>
          <Heading size="3xl">User Configuration</Heading>
          <UserDataUpdate />
          <Box>
            <Heading size="xl" mb={5}>
              Basic Setting
            </Heading>
            <BasicSetting />
          </Box>
          <PasswordUpdate />
          <DeleteAccount />
        </Stack>
      </Container>
    </Box>
  )
}

export default UserConfig
