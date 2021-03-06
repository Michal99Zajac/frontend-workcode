import React from 'react'
import {
  Button,
  Center,
  Input,
  InputGroup,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'

import { Window } from 'common/components'
import { useToast } from 'common/hooks'
import { useChangePassword, Form } from 'auth/api/useChangePassword'

export function ChangePassword(): JSX.Element {
  const { t } = useTranslation()
  const runToast = useToast()
  const navigate = useNavigate()
  const { token } = useParams()
  const { control, formState, handleSubmit } = useForm<Form>({
    resolver: zodResolver(Form),
  })
  const { mutate, isLoading } = useChangePassword(token)

  const onSubmit = handleSubmit((data) => {
    if (data.password !== data.repeatedPassword) {
      runToast(
        {
          Password: t('auth.pages.change_password.toast.error.repeat.message'),
        },
        t('auth.pages.change_password.toast.error.repeat.title'),
        'error'
      )
      return
    }

    mutate(data, {
      onSuccess: () => {
        runToast(
          {
            message: t('auth.pages.change_password.toast.success.api.message'),
          },
          t('auth.pages.change_password.toast.success.api.title'),
          'success'
        )
        navigate('/auth/signin')
      },
      onError: (error) => {
        runToast(
          error.error,
          t('auth.pages.change_password.toast.error.api.title'),
          'error'
        )
      },
    })
  })

  return (
    <Center w="100%" h="100%">
      <Window
        title={t('auth.pages.change_password.window_title')}
        onClick={() => navigate('/')}
      >
        <form onSubmit={onSubmit}>
          <Stack mt={4} minW="340px" w="340px" spacing={5}>
            <Controller
              control={control}
              name="password"
              render={({ field, fieldState }) => (
                <InputGroup display="flex" flexDirection="column">
                  <Text fontSize="sm">
                    * {t('auth.pages.change_password.form.password.label')}
                  </Text>
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
                  <Text fontSize="sm">
                    *{' '}
                    {t(
                      'auth.pages.change_password.form.repeatedPassword.label'
                    )}
                  </Text>
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
              onClick={() =>
                runToast(
                  formState.errors,
                  t('auth.pages.change_password.toast.error.zod.title'),
                  'error'
                )
              }
            >
              {t('auth.pages.change_password.form.submit_button.label')}
            </Button>
          </Stack>
        </form>
      </Window>
    </Center>
  )
}

export default ChangePassword
