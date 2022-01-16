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
import { useForm, Controller } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import validator from 'validator'
import Draggable from 'react-draggable'

import { signup, FormError } from '../../api/signup'
import { Window } from '../../../common/components'

import { Form } from './types'
import classes from './SignUp.module.scss'

export function SignUp(): JSX.Element {
  const toast = useToast()
  const navigation = useNavigate()
  const { control, handleSubmit, formState } = useForm<Form>()
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = handleSubmit<Form>(async (data) => {
    setIsLoading(true)
    try {
      if (data.password !== data.repeatedPassword) {
        throw new Error('passwords are not the same')
      }

      await signup(data)
      setIsLoading(false)
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
      const signupError = error as FormError | Error

      if (signupError instanceof Error) {
        displayValidation('Password', signupError.message)
      } else {
        if (signupError.email) displayValidation('Email', signupError.email)
        if (signupError.password)
          displayValidation('Password', signupError.password)
        if (signupError.firstname)
          displayValidation('Firstname', signupError.firstname)
        if (signupError.lastname)
          displayValidation('Lastname', signupError.lastname)
      }
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
      <Draggable
        bounds="parent"
        defaultClassName="grab"
        defaultClassNameDragging="grabbing"
      >
        <Box position="absolute">
          <Window title="Sign Up" onClick={() => navigation('/')}>
            <form className={classes.windowContent} onSubmit={onSubmit}>
              <Controller
                control={control}
                name="email"
                rules={{
                  required: 'email is required',
                  validate: {
                    isEmail: (value) =>
                      validator.isEmail(value) || 'input should be email',
                  },
                }}
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
                rules={{
                  required: 'firstname is required',
                }}
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
                rules={{
                  required: 'lastname is required',
                }}
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
                rules={{
                  required: 'password is required',
                  validate: {
                    isPassword: (value) =>
                      validator.isStrongPassword(value) ||
                      'password should be strong',
                  },
                }}
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
                rules={{
                  required: 'repeated password is required',
                }}
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
      </Draggable>
    </Box>
  )
}

export default SignUp
