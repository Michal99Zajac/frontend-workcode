import React, { useState } from 'react'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Form, Fail, deleteAccount } from '../../api/deleteAccount'
import { useToast } from '../../../common/hooks'
import { useAuth } from '../../../common/store'

export function DeleteAccount(): JSX.Element {
  const logout = useAuth((state) => state.logout)
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const { onOpen, onClose, isOpen } = useDisclosure()
  const { control, handleSubmit, formState } = useForm<Form>({
    resolver: zodResolver(Form),
  })
  const runToast = useToast()

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true)
    try {
      const response = await deleteAccount(data)
      runToast(response, 'Success', 'success')
      logout()
      navigate('/')
    } catch (error) {
      const fail = Fail.parse(error)
      runToast(fail, 'Error', 'error')
    }
    setIsLoading(false)
  })

  return (
    <Box>
      <Heading size="xl" mb={5}>
        Delete Account
      </Heading>
      <Button onClick={onOpen}>Delete</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={onSubmit}>
            <ModalHeader>Delete Account</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack spacing={4}>
                <Alert
                  status="warning"
                  flexDirection="column"
                  alignItems="flex-start"
                >
                  <Flex>
                    <AlertIcon />
                    <AlertTitle fontSize="xs">Warrning!</AlertTitle>
                  </Flex>
                  <AlertDescription fontSize="xs">
                    Remember, if you delete your account, you will not be able
                    to restore it
                  </AlertDescription>
                </Alert>
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
              </Stack>
            </ModalBody>
            <ModalFooter>
              <Button
                isLoading={isLoading}
                type="submit"
                onClick={() => runToast(formState.errors, 'Error', 'error')}
              >
                confirm
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default DeleteAccount
