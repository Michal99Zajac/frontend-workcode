import React from 'react'
import {
  Input,
  InputGroup,
  Text,
  Button,
  Divider,
  Center,
  Stack,
  Box,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useSignUp, Form } from 'auth/api/useSignUp'
import { useToast } from 'common/hooks'
import { Window } from 'common/components'

export function SignUp(): JSX.Element {
  const navigation = useNavigate()
  const runToast = useToast()
  const { control, handleSubmit, formState } = useForm<Form>({
    resolver: zodResolver(Form),
  })
  const { mutate, isLoading } = useSignUp()

  const onSubmit = handleSubmit((data) => {
    if (data.password !== data.repeatedPassword) {
      runToast({ password: 'Passwords are not the same' }, 'Error', 'error')
      return
    }

    mutate(data, {
      onSuccess: () => {
        runToast({ message: 'User has been created' }, 'Sign Up', 'success')
        navigation('/auth/signin')
      },
      onError: (error) => {
        runToast(error.error, 'Sign Up', 'error')
      },
    })
  })

  return (
    <Center w="100%" h="100%">
      <Window title="Sign Up" onClick={() => navigation('/')}>
        <form onSubmit={onSubmit}>
          <Stack mt={4} minW="340px" spacing={5}>
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
            <Controller
              control={control}
              name="name"
              render={({ field, fieldState }) => (
                <InputGroup display="flex" flexDirection="column">
                  <Text fontSize="sm">* Firstname</Text>
                  <Input
                    isDisabled={isLoading}
                    placeholder="Jhon"
                    onChange={field.onChange}
                    isInvalid={fieldState.invalid}
                    ref={field.ref}
                  />
                </InputGroup>
              )}
            />
            <Controller
              control={control}
              name="lastname"
              render={({ field, fieldState }) => (
                <InputGroup display="flex" flexDirection="column">
                  <Text fontSize="sm">* Lastname</Text>
                  <Input
                    isDisabled={isLoading}
                    placeholder="Snow"
                    onChange={field.onChange}
                    isInvalid={fieldState.invalid}
                    ref={field.ref}
                  />
                </InputGroup>
              )}
            />
            <Controller
              control={control}
              name="password"
              render={({ field, fieldState }) => (
                <InputGroup display="flex" flexDirection="column">
                  <Text fontSize="sm">* Password</Text>
                  <Input
                    isDisabled={isLoading}
                    type="password"
                    placeholder="password"
                    onChange={field.onChange}
                    isInvalid={fieldState.invalid}
                    ref={field.ref}
                  />
                </InputGroup>
              )}
            />
            <Controller
              control={control}
              name="repeatedPassword"
              render={({ field, fieldState }) => (
                <InputGroup display="flex" flexDirection="column">
                  <Text fontSize="sm">* Repeat Password</Text>
                  <Input
                    isDisabled={isLoading}
                    type="password"
                    placeholder="repeated password"
                    onChange={field.onChange}
                    isInvalid={fieldState.invalid}
                    ref={field.ref}
                  />
                </InputGroup>
              )}
            />
            <Button
              isFullWidth
              isLoading={isLoading}
              type="submit"
              onClick={() => runToast(formState.errors, 'Error', 'error')}
            >
              sign up
            </Button>
            <Divider />
            <Box>
              <Text alignSelf="flex-start" fontSize="xs">
                Have an account?
              </Text>
              <Button
                colorScheme="gray"
                isFullWidth
                alignSelf="flex-start"
                onClick={() => navigation('/auth/signin')}
              >
                sign in
              </Button>
            </Box>
          </Stack>
        </form>
      </Window>
    </Center>
  )
}

export default SignUp
