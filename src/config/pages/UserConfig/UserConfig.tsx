import React, { useState } from 'react'
import {
  AlertDialog,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Controller, useForm } from 'react-hook-form'
import { CloseIcon } from '@chakra-ui/icons'

import { BasicSetting } from '../../../common/components'

import classes from './UserConfig.module.scss'

export function UserConfig(): JSX.Element {
  const { control } = useForm()
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  return (
    <Box className={classes.page}>
      <Container maxW="container.md" py={5}>
        <Stack spacing={8}>
          <Heading size="3xl">User Configuration</Heading>
          <form>
            <Flex align="center" mb={5}>
              <Heading size="xl">User Data</Heading>
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
                name="firstname"
                render={({ field, fieldState }) => (
                  <Box>
                    <Text fontSize="sm">Firstname</Text>
                    <Input
                      isDisabled={isLoading}
                      placeholder="firstname"
                      onChange={field.onChange}
                      isInvalid={fieldState.invalid}
                      ref={field.ref}
                    />
                  </Box>
                )}
              />
              <Controller
                control={control}
                name="lastname"
                render={({ field, fieldState }) => (
                  <Box>
                    <Text fontSize="sm">Lastname</Text>
                    <Input
                      isDisabled={isLoading}
                      placeholder="lastname"
                      onChange={field.onChange}
                      isInvalid={fieldState.invalid}
                      ref={field.ref}
                    />
                  </Box>
                )}
              />
              <Controller
                control={control}
                name="email"
                render={({ field, fieldState }) => (
                  <Box>
                    <Text fontSize="sm">Email</Text>
                    <Input
                      isDisabled={isLoading}
                      placeholder="email@email.com"
                      onChange={field.onChange}
                      isInvalid={fieldState.invalid}
                      ref={field.ref}
                    />
                  </Box>
                )}
              />
            </Stack>
          </form>
          <Box>
            <Heading size="xl" mb={5}>
              Layout
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
          <form>
            <Heading size="xl" mb={5}>
              Delete Account
            </Heading>
            <Button onClick={() => setIsOpen(true)}>Delete</Button>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Delete Account</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
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
                </ModalBody>
                <ModalFooter>
                  <Button>click</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </form>
        </Stack>
      </Container>
    </Box>
  )
}

export default UserConfig
