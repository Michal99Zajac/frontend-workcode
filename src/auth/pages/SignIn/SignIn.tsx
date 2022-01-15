import React, { useCallback, useState } from 'react'
import {
  Box,
  Image,
  Heading,
  Input,
  InputGroup,
  useToast,
  Text,
  Button,
} from '@chakra-ui/react'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import validator from 'validator'
import Draggable from 'react-draggable'

import { Error, signin } from '../../api/signin'
import { BasicSetting, Window } from '../../../common/components'
import { useAuth } from '../../../common/hooks'
import LogoImage from '../../../assets/img/logo.png'

import classes from './SignIn.module.scss'

interface Form {
  email: string
  password: string
}

export function SignIn(): JSX.Element {
  const { login } = useAuth()
  const toast = useToast()
  const navigation = useNavigate()
  const { control, handleSubmit, formState } = useForm<Form>()
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = handleSubmit<Form>(async (data) => {
    setIsLoading(true)
    try {
      const response = await signin(data)
      login(
        {
          email: response.email,
          id: response.id,
          permissions: response.permissions,
        },
        response.token
      )
      setIsLoading(false)
      navigation('/workspace/menu')
    } catch (error) {
      const signinError = error as Error

      if (signinError.email) displayValidation('Email', signinError.email)
      if (signinError.password)
        displayValidation('Password', signinError.password)
    }
    setIsLoading(false)
  })

  const displayValidation = useCallback(
    (title: string, description: string) => {
      toast({
        title: title,
        description: description,
        status: 'error',
        duration: null,
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
  }, [formState.errors])

  return (
    <Box className={classes.page}>
      <Box className={classes.setting}>
        <BasicSetting />
      </Box>
      <Box className={classes.center}>
        <Box width={40} height={40}>
          <Image src={LogoImage} alt="Logo" />
        </Box>
        <Heading marginLeft={20} fontSize="9xl">
          Workcode
        </Heading>
      </Box>
      <Draggable
        bounds="parent"
        defaultClassName="grab"
        defaultClassNameDragging="grabbing"
      >
        <Box position="absolute">
          <Window title="Sign In" onClick={() => navigation('/')}>
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
              <Button
                isLoading={isLoading}
                alignSelf="flex-end"
                type="submit"
                onClick={valid}
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

export default SignIn
