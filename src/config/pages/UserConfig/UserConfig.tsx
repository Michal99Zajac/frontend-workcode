import React, { useState } from 'react'
import {
  Box,
  Container,
  Flex,
  Heading,
  IconButton,
  Input,
  Spacer,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Controller, useForm } from 'react-hook-form'
import { CloseIcon } from '@chakra-ui/icons'

import { BasicSetting } from '../../../common/components'
import { DeleteAccount, UserDataUpdate } from '../../components'

import classes from './UserConfig.module.scss'

export function UserConfig(): JSX.Element {
  const { control } = useForm()
  const [isLoading] = useState(false)

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
          <form>
            <Flex align="center" mb={5}>
              <Heading size="xl">Password</Heading>
              <Spacer />
              <IconButton
                aria-label="close user data"
                size="lg"
                icon={<CloseIcon />}
              />
            </Flex>
            <Stack>
              <Controller
                control={control}
                name="password"
                render={({ field, fieldState }) => (
                  <Box>
                    <Text fontSize="sm">Password</Text>
                    <Input
                      type="password"
                      isDisabled={isLoading}
                      placeholder="Av+>mMUpw$aGQ"
                      onChange={field.onChange}
                      isInvalid={fieldState.invalid}
                      ref={field.ref}
                    />
                  </Box>
                )}
              />
              <Controller
                control={control}
                name="repeatPassword"
                render={({ field, fieldState }) => (
                  <Box>
                    <Text fontSize="sm">Repeat Password</Text>
                    <Input
                      type="password"
                      isDisabled={isLoading}
                      placeholder="Av+>mMUpw$aGQ"
                      onChange={field.onChange}
                      isInvalid={fieldState.invalid}
                      ref={field.ref}
                    />
                  </Box>
                )}
              />
            </Stack>
          </form>
          <DeleteAccount />
        </Stack>
      </Container>
    </Box>
  )
}

export default UserConfig
