import React, { useCallback, useState } from 'react'
import {
  Box,
  Input,
  InputGroup,
  useToast,
  Text,
  Button,
  Divider,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { signup } from '../../api/signup'
import { Window, DragPocket } from '../../../common/components'
import {
  SignUpType,
  SignUpSchema,
  SignUpErrorSchema,
} from '../../schemas/SignUpSchema'

import classes from './SignUp.module.scss'

export function SignUp(): JSX.Element {
  const toast = useToast()
  const navigation = useNavigate()
  const { control, handleSubmit, formState } = useForm({
    resolver: zodResolver(SignUpSchema),
  })
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = handleSubmit<SignUpType>(async (data) => {
    setIsLoading(true)

    try {
      if (data.password !== data.repeatedPassword) {
        throw new Error('passwords are not the same')
      }
    } catch (error) {
      const { message } = error as Error
      displayValidation('Password', message)
      setIsLoading(false)
      return
    }

    try {
      await signup(data)
      toast({
        title: 'Sign Up',
        description: 'Your account has been created',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      })
      navigation('/auth/signin')
    } catch (error) {
      const signupError = SignUpErrorSchema.parse(error)

      if (signupError.email) displayValidation('Email', signupError.email)
      if (signupError.password)
        displayValidation('Password', signupError.password)
      if (signupError.firstname)
        displayValidation('Firstname', signupError.firstname)
      if (signupError.lastname)
        displayValidation('Lastname', signupError.lastname)
    }
    setIsLoading(false)
  })

  const displayValidation = useCallback(
    (title: string, description: string) => {
      toast({
        title: title,
        description: description,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      })
    },
    []
  )

  const valid = useCallback(() => {
    if (formState.errors.email?.message) {
      displayValidation('Email', formState.errors.email.message)
    }

    if (formState.errors.password?.message) {
      displayValidation('Password', formState.errors.password.message)
    }

    if (formState.errors.firstname?.message) {
      displayValidation('Firstname', formState.errors.firstname.message)
    }

    if (formState.errors.lastname?.message) {
      displayValidation('Lastname', formState.errors.lastname.message)
    }

    if (formState.errors.repeatedPassword?.message) {
      displayValidation('Repeat', formState.errors.repeatedPassword.message)
    }
  }, [formState.errors])

  return (
    <Box className={classes.page}>
      <DragPocket>
        <Box position="absolute">
          <Window title="Sign Up" onClick={() => navigation('/')}>
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
                name="firstname"
                render={({ field, fieldState }) => (
                  <InputGroup
                    marginBottom={5}
                    display="flex"
                    flexDirection="column"
                  >
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
                  <InputGroup
                    marginBottom={5}
                    display="flex"
                    flexDirection="column"
                  >
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
              <Controller
                control={control}
                name="repeatedPassword"
                render={({ field, fieldState }) => (
                  <InputGroup
                    marginBottom={5}
                    display="flex"
                    flexDirection="column"
                  >
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
              <Button isLoading={isLoading} type="submit" onClick={valid}>
                sign up
              </Button>
              <Divider mb={5} mt={5} />
              <Text alignSelf="flex-start" mb={1} fontSize="xs">
                Have an account?
              </Text>
              <Button
                alignSelf="flex-start"
                onClick={() => navigation('/auth/signin')}
              >
                sign in
              </Button>
            </form>
          </Window>
        </Box>
      </DragPocket>
    </Box>
  )
}

export default SignUp
