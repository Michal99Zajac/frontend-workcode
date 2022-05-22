import React, { useEffect } from 'react'
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
import { useTranslation } from 'react-i18next'

import { useMe } from 'config/api/useMe'
import { useUpdateMe, Form } from 'config/api/useUpdateMe'
import { useToast } from 'common/hooks'

export function UserDataUpdate(): JSX.Element {
  const { t } = useTranslation()
  const { isFetching, data } = useMe()
  const { isLoading, mutate } = useUpdateMe()
  const runToast = useToast()
  const { control, formState, handleSubmit, reset } = useForm<Form>({
    resolver: zodResolver(Form),
    defaultValues: {
      email: data ? data.email : '',
      lastname: data ? data.lastname : '',
      name: data ? data.name : '',
    },
  })

  const onSubmit = handleSubmit((data) => {
    mutate(data, {
      onSuccess: () => {
        runToast(
          {
            message: t(
              'config.components.user_data_update.toast.success.api.message'
            ),
          },
          t('config.components.user_data_update.toast.success.api.title'),
          'success'
        )
      },
      onError: (error) => {
        runToast(
          error.message,
          t('config.components.user_data_update.toast.error.api.title'),
          'error'
        )
      },
    })
  })

  useEffect(() => {
    if (data) {
      reset({
        email: data.email,
        lastname: data.lastname,
        name: data.name,
      })
    }
  }, [data])

  return (
    <form onSubmit={onSubmit}>
      <Flex align="center" mb={5}>
        <Heading size="xl">
          {t('config.components.user_data_update.heading')}
        </Heading>
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
          name="name"
          render={({ field, fieldState }) => (
            <Box>
              <Text fontSize="sm">
                {t('config.components.user_data_update.form.name.label')}
              </Text>
              <Input
                isDisabled={isFetching || isLoading}
                placeholder={t(
                  'config.components.user_data_update.form.name.placeholder'
                )}
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
              <Text fontSize="sm">
                {t('config.components.user_data_update.form.lastname.label')}
              </Text>
              <Input
                isDisabled={isFetching || isLoading}
                placeholder={t(
                  'config.components.user_data_update.form.lastname.placeholder'
                )}
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
              <Text fontSize="sm">
                {t('config.components.user_data_update.form.email.label')}
              </Text>
              <Input
                isDisabled={isFetching || isLoading}
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
            onClick={() =>
              runToast(
                formState.errors,
                t('config.components.user_data_update.toast.error.zod.title'),
                'error'
              )
            }
          >
            {t('config.components.user_data_update.form.submit_button.content')}
          </Button>
        )}
      </Stack>
    </form>
  )
}

export default UserDataUpdate
