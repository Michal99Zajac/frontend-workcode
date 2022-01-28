import React, { useState } from 'react'
import { CloseIcon } from '@chakra-ui/icons'
import {
  Flex,
  Heading,
  Spacer,
  IconButton,
  Stack,
  Box,
  Input,
  Text,
  Button,
  useToast,
} from '@chakra-ui/react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  changePassword,
  Form,
  FormType,
  Fail,
} from '../../../auth/api/changePassword'
import { useValidToast } from '../../../common/hooks'

export function PasswordUpdate(): JSX.Element {
  const [isLoading, setIsLoading] = useState(false)
  const valid = useValidToast()
  const toast = useToast()
  const { control, formState, handleSubmit, reset } = useForm<FormType>({
    resolver: zodResolver(Form),
    defaultValues: {
      password: '',
      repeatedPassword: '',
    },
  })

  const onSubmit = handleSubmit<FormType>(async (data) => {
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
        duration: 5000,
        title: 'Success',
        description: response.success,
        status: 'success',
        position: 'top',
      })
      reset()
    } catch (error) {
      const fail = Fail.parse(error)
      valid(fail, 'error')
    }
    setIsLoading(false)
  })

  return (
    <form onSubmit={onSubmit}>
      <Flex align="center" mb={5}>
        <Heading size="xl">Password</Heading>
        <Spacer />
        {formState.isDirty && (
          <IconButton
            aria-label="close user data"
            size="md"
            icon={<CloseIcon />}
            onClick={() => reset()}
          />
        )}
      </Flex>
      <Stack spacing={5}>
        <Controller
          control={control}
          name="password"
          render={({ field, fieldState }) => (
            <Box>
              <Text fontSize="sm">Password</Text>
              <Input
                type="password"
                isDisabled={isLoading}
                placeholder="Av+>mMUpw$aGQ"
                onChange={field.onChange}
                isInvalid={fieldState.invalid}
                value={field.value}
                ref={field.ref}
              />
            </Box>
          )}
        />
        <Controller
          control={control}
          name="repeatedPassword"
          render={({ field, fieldState }) => (
            <Box>
              <Text fontSize="sm">Repeat Password</Text>
              <Input
                type="password"
                isDisabled={isLoading}
                placeholder="Av+>mMUpw$aGQ"
                onChange={field.onChange}
                isInvalid={fieldState.invalid}
                value={field.value}
                ref={field.ref}
              />
            </Box>
          )}
        />
        {formState.isDirty && (
          <Button
            mt={10}
            width="min-content"
            isLoading={isLoading}
            type="submit"
            onClick={() => valid(formState.errors, 'error')}
          >
            Submit
          </Button>
        )}
      </Stack>
    </form>
  )
}

export default PasswordUpdate
