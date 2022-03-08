import React, { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Input,
  InputGroup,
  Text,
  Button,
  Divider,
  Link,
  Center,
  Stack,
} from '@chakra-ui/react'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate, Link as RouterLink } from 'react-router-dom'

import { signin, Form, Fail } from '../../api/signin'
import { Window } from '../../../common/components'
import { useAuth } from '../../../common/store'
import { useToast } from '../../../common/hooks'

export function SignIn(): JSX.Element {
  const login = useAuth((state) => state.login)
  const runToast = useToast()
  const navigation = useNavigate()
  const { control, handleSubmit, formState } = useForm<Form>({
    resolver: zodResolver(Form),
  })
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true)
    try {
      const response = await signin(data)
      login(
        {
          id: response.user.id,
          email: response.user.email,
          permissions: response.user.permissions,
        },
        response.token
      )
      setIsLoading(false)
      navigation('/workspace')
    } catch (error) {
      const signinError = Fail.parse(error)
      runToast(signinError, 'Error', 'error')
    }
    setIsLoading(false)
  })

  return (
    <Center w="100%" h="100%">
      <Window title="Sign In" onClick={() => navigation('/')}>
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
            <Button
              isFullWidth
              isLoading={isLoading}
              type="submit"
              onClick={() => runToast(formState.errors, 'Sign In', 'error')}
            >
              sign in
            </Button>
            <Link
              mt={3}
              mb={1}
              as={RouterLink}
              fontSize="xs"
              to="/auth/forgot-password"
            >
              Forgot your password?
            </Link>
          </Stack>
          <Divider mb={5} />
          <Text alignSelf="flex-start" mb={1} fontSize="xs">
            Don&apos;t have an account?
          </Text>
          <Button
            colorScheme="gray"
            isFullWidth
            alignSelf="flex-start"
            onClick={() => navigation('/auth/signup')}
          >
            sign up
          </Button>
        </form>
      </Window>
    </Center>
  )
}

export default SignIn
