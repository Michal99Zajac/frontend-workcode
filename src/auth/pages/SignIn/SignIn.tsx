import React from 'react'
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

import { BasicSetting, Window } from '../../../common/components'
import LogoImage from '../../../assets/img/logo.png'

import classes from './SignIn.module.scss'

export function SignIn(): JSX.Element {
  const toast = useToast()
  const navigation = useNavigate()
  const { control, handleSubmit, formState } = useForm()

  const valid = () => {
    if (formState.errors.email) {
      toast({
        title: 'Email',
        description: formState.errors.email.message,
        status: 'error',
        duration: null,
        isClosable: true,
        position: 'top',
      })
    }

    if (formState.errors.password) {
      toast({
        title: 'Password',
        description: formState.errors.password.message,
        status: 'error',
        duration: null,
        isClosable: true,
        position: 'top',
      })
    }
  }

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
            <form
              className={classes.windowContent}
              onSubmit={handleSubmit((data) => alert(JSON.stringify(data)))}
            >
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
                    <Text fontSize="sm">Email</Text>
                    <Input
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
                  required: 'input is required',
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
                    <Text fontSize="sm">Password</Text>
                    <Input
                      type="password"
                      placeholder="password"
                      onChange={field.onChange}
                      isInvalid={fieldState.invalid}
                      ref={field.ref}
                    />
                  </InputGroup>
                )}
              />
              <Button alignSelf="flex-end" type="submit" onClick={valid}>
                submit
              </Button>
            </form>
          </Window>
        </Box>
      </Draggable>
    </Box>
  )
}

export default SignIn
