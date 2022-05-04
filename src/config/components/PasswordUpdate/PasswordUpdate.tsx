import React from 'react'
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
} from '@chakra-ui/react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useUpdatePassword, Form } from 'config/api/useUpdatePassword'
import { useToast } from '../../../common/hooks'

export function PasswordUpdate(): JSX.Element {
  // const [isLoading, setIsLoading] = useState(false)
  const runToast = useToast()
  const { control, formState, handleSubmit, reset } = useForm<Form>({
    resolver: zodResolver(Form),
    defaultValues: {
      password: '',
      repeatedPassword: '',
    },
  })
  const { mutate, isLoading } = useUpdatePassword()

  const onSubmit = handleSubmit((data) => {
    if (data.password !== data.repeatedPassword) {
      runToast({ Password: 'Passwords are different' }, 'Error', 'error')
      return
    }

    mutate(data, {
      onSuccess: () => {
        runToast({ message: 'Password has been changed' }, 'Success', 'success')
        reset()
      },
      onError: (error) => {
        runToast(error.message, 'Error', 'error')
      },
    })
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
            onClick={() => runToast(formState.errors, 'Error', 'error')}
          >
            Submit
          </Button>
        )}
      </Stack>
    </form>
  )
}

export default PasswordUpdate
