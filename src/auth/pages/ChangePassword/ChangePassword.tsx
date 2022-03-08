import React, { useState } from 'react'
import {
  Button,
  Center,
  Input,
  InputGroup,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'

import { Window } from '../../../common/components'
import { useToast } from '../../../common/hooks'
import { changePassword, Form, Fail, FormType } from '../../api/changePassword'

export function ChangePassword(): JSX.Element {
  const runToast = useToast()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const { control, formState, handleSubmit } = useForm<FormType>({
    resolver: zodResolver(Form),
  })

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true)

    if (data.password !== data.repeatedPassword) {
      runToast({ Password: 'Passwords are different' }, 'Error', 'error')
      setIsLoading(false)
      return
    }

    try {
      const response = await changePassword(data)
      runToast(response, 'Success', 'success')
      navigate('/auth/signin')
    } catch (error) {
      const changePasswordError = Fail.parse(error)
      runToast(changePasswordError, 'Error', 'error')
    }

    setIsLoading(false)
  })

  return (
    <Center w="100%" h="100%">
      <Window title="Change Password" onClick={() => navigate('/')}>
        <form onSubmit={onSubmit}>
          <Stack mt={4} minW="340px" w="340px" spacing={5}>
            <Controller
              control={control}
              name="password"
              render={({ field, fieldState }) => (
                <InputGroup display="flex" flexDirection="column">
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
                <InputGroup display="flex" flexDirection="column">
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
              onClick={() => runToast(formState.errors, 'Error', 'error')}
            >
              change password
            </Button>
          </Stack>
        </form>
      </Window>
    </Center>
  )
}

export default ChangePassword
