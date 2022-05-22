import React from 'react'
import {
  Input,
  InputGroup,
  Text,
  Button,
  Divider,
  Center,
  Stack,
  Box,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { useSignUp, Form } from 'auth/api/useSignUp'
import { useToast } from 'common/hooks'
import { Window } from 'common/components'

export function SignUp(): JSX.Element {
  const { t } = useTranslation()
  const navigation = useNavigate()
  const runToast = useToast()
  const { control, handleSubmit, formState } = useForm<Form>({
    resolver: zodResolver(Form),
  })
  const { mutate, isLoading } = useSignUp()

  const onSubmit = handleSubmit((data) => {
    if (data.password !== data.repeatedPassword) {
      runToast(
        { password: t('auth.pages.sign_up.toast.error.repeat.message') },
        t('auth.pages.sign_up.toast.error.repeat.title'),
        'error'
      )
      return
    }

    mutate(data, {
      onSuccess: () => {
        runToast(
          { message: t('auth.pages.sign_up.toast.success.api.message') },
          t('auth.pages.sign_up.toast.success.api.title'),
          'success'
        )
        navigation('/auth/signin')
      },
      onError: (error) => {
        runToast(
          error.error,
          t('auth.pages.sign_up.toast.error.api.title'),
          'error'
        )
      },
    })
  })

  return (
    <Center w="100%" h="100%">
      <Window
        title={t('auth.pages.sign_up.window_title')}
        onClick={() => navigation('/')}
      >
        <form onSubmit={onSubmit}>
          <Stack mt={4} minW="340px" spacing={5}>
            <Controller
              control={control}
              name="email"
              render={({ field, fieldState }) => (
                <InputGroup display="flex" flexDirection="column">
                  <Text fontSize="sm">
                    * {t('auth.pages.sign_up.form.email.label')}
                  </Text>
                  <Input
                    isDisabled={isLoading}
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
              name="name"
              render={({ field, fieldState }) => (
                <InputGroup display="flex" flexDirection="column">
                  <Text fontSize="sm">
                    * {t('auth.pages.sign_up.form.name.label')}
                  </Text>
                  <Input
                    isDisabled={isLoading}
                    placeholder={t('auth.pages.sign_up.form.name.placeholder')}
                    onChange={field.onChange}
                    isInvalid={fieldState.invalid}
                    ref={field.ref}
                  />
                </InputGroup>
              )}
            />
            <Controller
              control={control}
              name="lastname"
              render={({ field, fieldState }) => (
                <InputGroup display="flex" flexDirection="column">
                  <Text fontSize="sm">
                    * {t('auth.pages.sign_up.form.lastname.label')}
                  </Text>
                  <Input
                    isDisabled={isLoading}
                    placeholder={t(
                      'auth.pages.sign_up.form.lastname.placeholder'
                    )}
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
              render={({ field, fieldState }) => (
                <InputGroup display="flex" flexDirection="column">
                  <Text fontSize="sm">
                    * {t('auth.pages.sign_up.form.password.label')}
                  </Text>
                  <Input
                    isDisabled={isLoading}
                    type="password"
                    placeholder={t(
                      'auth.pages.sign_up.form.password.placeholder'
                    )}
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
                    * {t('auth.pages.sign_up.form.repeatedPassword.label')}
                  </Text>
                  <Input
                    isDisabled={isLoading}
                    type="password"
                    placeholder={t(
                      'auth.pages.sign_up.form.repeatedPassword.placeholder'
                    )}
                    onChange={field.onChange}
                    isInvalid={fieldState.invalid}
                    ref={field.ref}
                  />
                </InputGroup>
              )}
            />
            <Button
              isFullWidth
              isLoading={isLoading}
              type="submit"
              onClick={() =>
                runToast(
                  formState.errors,
                  t('auth.pages.sign_up.toast.error.zod.title'),
                  'error'
                )
              }
            >
              {t('auth.pages.sign_up.form.submit_button.content')}
            </Button>
            <Divider />
            <Box>
              <Text alignSelf="flex-start" fontSize="xs">
                {t('auth.pages.sign_up.signin_button.label')}
              </Text>
              <Button
                colorScheme="gray"
                isFullWidth
                alignSelf="flex-start"
                onClick={() => navigation('/auth/signin')}
              >
                {t('auth.pages.sign_up.signin_button.content')}
              </Button>
            </Box>
          </Stack>
        </form>
      </Window>
    </Center>
  )
}

export default SignUp
