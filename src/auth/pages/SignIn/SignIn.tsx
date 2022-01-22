import React, { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Box,
  Input,
  InputGroup,
  Text,
  Button,
  Divider,
  Link,
} from '@chakra-ui/react'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate, Link as RouterLink } from 'react-router-dom'

import { signin } from '../../api/signin'
import { Window, DragPocket } from '../../../common/components'
import { useAuth } from '../../../common/store'
import { useValidToast } from '../../../common/hooks'
import {
  SignInSchema,
  SignInSchemaType,
  SignInErrorSchema,
  SignInResponseSchema,
} from '../../schemas'

import classes from './SignIn.module.scss'

export function SignIn(): JSX.Element {
  const login = useAuth((state) => state.login)
  const valid = useValidToast()
  const navigation = useNavigate()
  const { control, handleSubmit, formState } = useForm({
    resolver: zodResolver(SignInSchema),
  })
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = handleSubmit<SignInSchemaType>(async (data) => {
    setIsLoading(true)
    try {
      const response = SignInResponseSchema.parse(await signin(data))
      login(
        {
          id: response.id,
          email: response.email,
          permissions: response.permissions,
        },
        response.token
      )
      setIsLoading(false)
      navigation('/workspace/menu')
    } catch (error) {
      const signinError = SignInErrorSchema.parse(error)
      valid(signinError, 'error')
    }
    setIsLoading(false)
  })

  return (
    <Box className={classes.page}>
      <DragPocket>
        <Box position="absolute">
          <Window title="Sign In" onClick={() => navigation('/')}>
            <form className={classes.windowContent} onSubmit={onSubmit}>
              <Controller
                control={control}
                name="email"
                render={({ field, fieldState }) => (
                  <InputGroup
                    marginBottom={5}
                    display="flex"
                    flexDirection="column"
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
              <Controller
                control={control}
                name="password"
                render={({ field, fieldState }) => (
                  <InputGroup
                    marginBottom={5}
                    display="flex"
                    flexDirection="column"
                  >
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
                isLoading={isLoading}
                type="submit"
                onClick={() => valid(formState.errors, 'error', 'Sign In')}
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
              <Divider mb={5} />
              <Text alignSelf="flex-start" mb={1} fontSize="xs">
                Don&apos;t have an account?
              </Text>
              <Button
                alignSelf="flex-start"
                onClick={() => navigation('/auth/signup')}
              >
                sign up
              </Button>
            </form>
          </Window>
        </Box>
      </DragPocket>
    </Box>
  )
}

export default SignIn
