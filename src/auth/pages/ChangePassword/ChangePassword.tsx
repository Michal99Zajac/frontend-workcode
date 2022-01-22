import React, { useState } from 'react'
import {
  Box,
  Button,
  Input,
  InputGroup,
  Text,
  useToast,
} from '@chakra-ui/react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'

import { DragPocket, Window } from '../../../common/components'
import { useValidToast } from '../../../common/hooks'
import {
  ChangePasswordSchema as ChangePasswordForm,
  ChangePasswordType as ChangePasswordFormType,
  ChangePasswordError,
} from '../../schemas/ChangePasswordSchema'
import { changePassword } from '../../api/changePassword'

import classes from './ChangePassword.module.scss'

export function ChangePassword(): JSX.Element {
  const valid = useValidToast()
  const toast = useToast()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const { control, formState, handleSubmit } = useForm({
    resolver: zodResolver(ChangePasswordForm),
  })

  const onSubmit = handleSubmit<ChangePasswordFormType>(async (data) => {
    setIsLoading(true)

    if (data.password !== data.repeatedPassword) {
      valid({ Password: 'Passwords are different' }, 'error')
      setIsLoading(false)
      return
    }

    try {
      const response = await changePassword(data)
      toast({
        isClosable: true,
        title: 'Success',
        description: response.success,
        status: 'success',
        duration: 3000,
        position: 'top',
      })
      navigate('/auth/signin')
    } catch (error) {
      const changePasswordError = ChangePasswordError.parse(error)
      valid(changePasswordError, 'error')
    }

    setIsLoading(false)
  })

  return (
    <Box className={classes.page}>
      <DragPocket>
        <Box position="absolute">
          <Window title="Change Password" onClick={() => navigate('/')}>
            <form className={classes.windowContent} onSubmit={onSubmit}>
              <Controller
                control={control}
                name="password"
                render={({ field, fieldState }) => (
                  <InputGroup
                    display="flex"
                    flexDirection="column"
                    marginBottom={5}
                  >
                    <Text fontSize="sm">* New Password</Text>
                    <Input
                      type="password"
                      isDisabled={isLoading}
                      placeholder="8S!cHGp3"
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
                    display="flex"
                    flexDirection="column"
                    marginBottom={5}
                  >
                    <Text fontSize="sm">* Repeat Password</Text>
                    <Input
                      type="password"
                      isDisabled={isLoading}
                      placeholder="8S!cHGp3"
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
                change password
              </Button>
            </form>
          </Window>
        </Box>
      </DragPocket>
    </Box>
  )
}

export default ChangePassword
