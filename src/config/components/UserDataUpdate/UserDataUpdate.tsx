import React, { useState, useEffect } from 'react'
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

import { useMe } from 'config/api/useMe'
import { Form, updateUserData, Fail } from 'config/api/updateUserData'
import { useToast } from 'common/hooks'

export function UserDataUpdate(): JSX.Element {
  const { isFetching, data } = useMe()
  const [isLoading, setIsLoading] = useState(false)
  const runToast = useToast()
  // const [formCopy, setFormCopy] = useState<Form | null>(null)
  const { control, formState, handleSubmit, reset } = useForm<Form>({
    resolver: zodResolver(Form),
    defaultValues: {
      email: data?.email,
      firstname: data?.lastname,
      lastname: data?.name,
    },
  })

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true)
    try {
      const response = await updateUserData(data)
      // setFormCopy(data)
      reset(data)
      runToast(response, 'Success', 'success')
    } catch (error) {
      const fail = Fail.parse(error)
      runToast(fail, 'Error', 'error')
    }
    setIsLoading(false)
  })

  useEffect(() => {
    if (data) {
      reset({
        email: data.email,
        lastname: data.lastname,
        firstname: data.name,
      })
    }
  }, [data])

  return (
    <form onSubmit={onSubmit}>
      <Flex align="center" mb={5}>
        <Heading size="xl">User Data</Heading>
        <Spacer />
        {formState.isDirty && (
          <IconButton
            aria-label="close user data"
            size="md"
            icon={<CloseIcon />}
            onClick={() => data && reset()}
          />
        )}
      </Flex>
      <Stack spacing={5}>
        <Controller
          control={control}
          name="firstname"
          render={({ field, fieldState }) => (
            <Box>
              <Text fontSize="sm">Firstname</Text>
              <Input
                isDisabled={isFetching}
                placeholder="firstname"
                onChange={field.onChange}
                value={field.value}
                isInvalid={fieldState.invalid}
              />
            </Box>
          )}
        />
        <Controller
          control={control}
          name="lastname"
          render={({ field, fieldState }) => (
            <Box>
              <Text fontSize="sm">Lastname</Text>
              <Input
                isDisabled={isLoading}
                placeholder="lastname"
                onChange={field.onChange}
                value={field.value}
                isInvalid={fieldState.invalid}
              />
            </Box>
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({ field, fieldState }) => (
            <Box>
              <Text fontSize="sm">Email</Text>
              <Input
                isDisabled={isLoading}
                placeholder="email@email.com"
                onChange={field.onChange}
                value={field.value}
                isInvalid={fieldState.invalid}
              />
            </Box>
          )}
        />
        {formState.isDirty && (
          <Button
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

export default UserDataUpdate
