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
import { useTranslation } from 'react-i18next'

import { useUpdatePassword, Form } from 'config/api/useUpdatePassword'
import { useToast } from 'common/hooks'

export function PasswordUpdate(): JSX.Element {
  const { t } = useTranslation()
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
      runToast(
        {
          Password: t(
            'config.components.password_update.toast.error.repeat.message'
          ),
        },
        t('config.components.password_update.toast.error.repeat.title'),
        'error'
      )
      return
    }

    mutate(data, {
      onSuccess: () => {
        runToast(
          {
            message: t(
              'config.components.password_update.toast.success.api.message'
            ),
          },
          t('config.components.password_update.toast.success.api.title'),
          'success'
        )
        reset()
      },
      onError: (error) => {
        runToast(
          error.message,
          t('config.components.password_update.toast.error.api.title'),
          'error'
        )
      },
    })
  })

  return (
    <form onSubmit={onSubmit}>
      <Flex align="center" mb={5}>
        <Heading size="xl">
          {t('config.components.password_update.heading')}
        </Heading>
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
              <Text fontSize="sm">
                {t('config.components.password_update.form.password.label')}
              </Text>
              <Input
                type="password"
                isDisabled={isLoading}
                placeholder="Av+>mMUpw$aGQ"
                onChange={field.onChange}
                isInvalid={fieldState.invalid}
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
              <Text fontSize="sm">
                {t(
                  'config.components.password_update.form.repeatedPassword.label'
                )}
              </Text>
              <Input
                type="password"
                isDisabled={isLoading}
                placeholder="Av+>mMUpw$aGQ"
                onChange={field.onChange}
                isInvalid={fieldState.invalid}
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
            onClick={() =>
              runToast(
                formState.errors,
                t('config.components.password_update.toast.error.zod.title'),
                'error'
              )
            }
          >
            {t('config.components.password_update.form.submit_button.content')}
          </Button>
        )}
      </Stack>
    </form>
  )
}

export default PasswordUpdate
