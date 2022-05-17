import React from 'react'
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

import { Window } from 'common/components'
import { useToast } from 'common/hooks'
import { useForgotPassword, Form } from 'auth/api/useForgotPassword'

export function ForgotPassword(): JSX.Element {
  const navigate = useNavigate()
  const runToast = useToast()
  const { control, handleSubmit, formState } = useForm<Form>({
    resolver: zodResolver(Form),
  })
  const { mutate, isLoading } = useForgotPassword()

  const onSubmit = handleSubmit((data) => {
    mutate(data, {
      onSuccess: (response) => runToast(response, 'Success', 'success'),
      onError: (error) => runToast(error.error, 'Error', 'error'),
    })
  })

  return (
    <Center w="100%" h="100%">
      <Window title="Forget Password" onClick={() => navigate('/auth/signin')}>
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
