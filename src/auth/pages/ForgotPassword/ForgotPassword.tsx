import React, { useState } from 'react'
import {
  Box,
  Button,
  Input,
  InputGroup,
  Text,
  Alert,
  AlertIcon,
  AlertDescription,
  AlertTitle,
  Flex,
  useToast,
} from '@chakra-ui/react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'

import { DragPocket, Window } from '../../../common/components'
import {
  ForgotPasswordSchema as ForgotPasswordForm,
  ForgotPasswordType as ForgotPasswordFormType,
  ForgotPasswordError as FormError,
} from '../../schemas/ForgotPasswordSchema'
import { useValidToast } from '../../../common/hooks'
import { sendForgottenEmail } from '../../api/sendForgottenEmail'

import classes from './ForgotPassword.module.scss'

export function ForgotPassword(): JSX.Element {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const valid = useValidToast()
  const toast = useToast()
  const { control, handleSubmit, formState } = useForm({
    resolver: zodResolver(ForgotPasswordForm),
  })

  const onSubmit = handleSubmit<ForgotPasswordFormType>(async (data) => {
    setIsLoading(true)
    try {
      await sendForgottenEmail(data)
      toast({
        isClosable: true,
        title: 'Success',
        description: 'Email for password change has been sent',
        status: 'success',
        duration: 3000,
        position: 'top',
      })
    } catch (error) {
      const forgotPasswordError = FormError.parse(error)
      valid(forgotPasswordError, 'error')
    }
    setIsLoading(false)
  })

  return (
    <Box className={classes.page}>
      <DragPocket>
        <Box position="absolute">
          <Window
            title="Forget Password"
            onClick={() => navigate('/auth/signin')}
          >
            <form className={classes.windowContent} onSubmit={onSubmit}>
              <Alert
                status="info"
                flexDirection="column"
                alignItems="flex-start"
                mb={5}
              >
                <Flex>
                  <AlertIcon />
                  <AlertTitle fontSize="xs">Important!</AlertTitle>
                </Flex>
                <AlertDescription fontSize="xs">
                  If you forget password write your email address and we will
                  send you link to page where you will able to reset your
                  password.
                </AlertDescription>
              </Alert>
              <Controller
                control={control}
                name="email"
                render={({ field, fieldState }) => (
                  <InputGroup
                    display="flex"
                    flexDirection="column"
                    marginBottom={5}
                  >
                    <Text fontSize="sm">* Email</Text>
                    <Input
                      isDisabled={isLoading}
                      placeholder="email@email.com"
                      onChange={field.onChange}
                      isInvalid={fieldState.invalid}
                      ref={field.ref}
                    />
                  </InputGroup>
                )}
              />
              <Button
                isLoading={isLoading}
                type="submit"
                onClick={() => valid(formState.errors, 'error')}
              >
                send request
              </Button>
            </form>
          </Window>
        </Box>
      </DragPocket>
    </Box>
  )
}

export default ForgotPassword
