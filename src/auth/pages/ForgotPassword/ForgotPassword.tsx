import React, { useState } from 'react'
import {
  Button,
  Input,
  InputGroup,
  Text,
  Alert,
  AlertIcon,
  AlertDescription,
  AlertTitle,
  Flex,
  Center,
  Stack,
} from '@chakra-ui/react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'

import { Window } from '../../../common/components'
import { useToast } from '../../../common/hooks'
import {
  sendForgottenEmail,
  Form,
  FormType,
  Fail,
} from '../../api/sendForgottenEmail'

export function ForgotPassword(): JSX.Element {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const runToast = useToast()
  const { control, handleSubmit, formState } = useForm({
    resolver: zodResolver(Form),
  })

  const onSubmit = handleSubmit<FormType>(async (data) => {
    setIsLoading(true)
    try {
      await sendForgottenEmail(data)
      runToast(
        { success: 'Email for password change has been sent' },
        'Success',
        'success'
      )
    } catch (error) {
      const fail = Fail.parse(error)
      runToast(fail, 'Error', 'error')
    }
    setIsLoading(false)
  })

  return (
    <Center w="100%" h="100%">
      <Window title="Forget Password" onClick={() => navigate('/auth')}>
        <form onSubmit={onSubmit}>
          <Stack mt={4} minW="340px" w="340px" spacing={5}>
            <Alert status="info" flexDirection="column" alignItems="flex-start">
              <Flex>
                <AlertIcon />
                <AlertTitle fontSize="xs">Important!</AlertTitle>
              </Flex>
              <AlertDescription fontSize="xs">
                If you forget password write your email address and we will send
                you link to page where you will able to reset your password.
              </AlertDescription>
            </Alert>
            <Controller
              control={control}
              name="email"
              render={({ field, fieldState }) => (
                <InputGroup display="flex" flexDirection="column">
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
              onClick={() => runToast(formState.errors, 'Error', 'error')}
            >
              send request
            </Button>
          </Stack>
        </form>
      </Window>
    </Center>
  )
}

export default ForgotPassword
