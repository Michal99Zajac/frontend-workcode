import React, { useCallback, useEffect, useState } from 'react'
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

import { Form, FormType, updateUserData, Fail } from '../../api/updateUserData'
import { useToast } from '../../../common/hooks'
import { fetchUser } from '../../../common/api'
import { useAuth } from '../../../common/store'

export function UserDataUpdate(): JSX.Element {
  const [isLoading, setIsLoading] = useState(false)
  const userId = useAuth((state) => state.user?.id)
  const runToast = useToast()
  const [formCopy, setFormCopy] = useState<FormType | null>(null)
  const { control, formState, handleSubmit, reset } = useForm<FormType>({
    resolver: zodResolver(Form),
    defaultValues: {
      email: '',
      firstname: '',
      lastname: '',
    },
  })

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true)
    try {
      const response = await updateUserData(data)
      setFormCopy(data)
      reset(data)
      runToast(response, 'Success', 'success')
    } catch (error) {
      const fail = Fail.parse(error)
      runToast(fail, 'Error', 'error')
    }
    setIsLoading(false)
  })

  const fetchInitialData = useCallback(async () => {
    if (!userId) throw new Error('User is not authenticated')
    setIsLoading(true)
    const response = await fetchUser({ id: userId })
    const initialForm = Form.parse(response)
    setFormCopy(initialForm)
    reset(initialForm)
    setIsLoading(false)
  }, [userId, reset])

  useEffect(() => {
    fetchInitialData()
  }, [])

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
            onClick={() => formCopy && reset(formCopy)}
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
                isDisabled={isLoading}
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
