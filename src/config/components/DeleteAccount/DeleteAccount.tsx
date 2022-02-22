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
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { ModalWindow } from '../../../common/components'
import { FormType, Form, Fail, deleteAccount } from '../../api/deleteAccount'
import { useToast } from '../../../common/hooks'
import { useAuth } from '../../../common/store'

export function DeleteAccount(): JSX.Element {
  const logout = useAuth((state) => state.logout)
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const { onOpen, onClose, isOpen } = useDisclosure()
  const { control, handleSubmit, formState } = useForm({
    resolver: zodResolver(Form),
  })
  const runToast = useToast()

  const onSubmit = handleSubmit<FormType>(async (data) => {
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
      <ModalWindow isOpen={isOpen} onClose={onClose} title="Delete Account">
        <form onSubmit={onSubmit}>
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
                Remember, if you delete your account, you will not be able to
                restore it
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
            <Flex justifyContent="flex-end">
              <Button
                isLoading={isLoading}
                type="submit"
                onClick={() => runToast(formState.errors, 'Error', 'error')}
              >
                confirm
              </Button>
            </Flex>
          </Stack>
        </form>
      </ModalWindow>
    </Box>
  )
}

export default DeleteAccount
