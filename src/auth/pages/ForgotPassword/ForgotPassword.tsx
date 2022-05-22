import React from 'react'
import {
  Button,
  Input,
  InputGroup,
  Text,
  Alert,
  AlertIcon,
  AlertDescription,
  AlertTitle,
  Flex,
  Center,
  Stack,
} from '@chakra-ui/react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { Window } from 'common/components'
import { useToast } from 'common/hooks'
import { useForgotPassword, Form } from 'auth/api/useForgotPassword'

export function ForgotPassword(): JSX.Element {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const runToast = useToast()
  const { control, handleSubmit, formState } = useForm<Form>({
    resolver: zodResolver(Form),
  })
  const { mutate, isLoading } = useForgotPassword()

  const onSubmit = handleSubmit((data) => {
    mutate(data, {
      onSuccess: (response) =>
        runToast(
          response,
          t('auth.pages.forgot_password.toast.success.api.title'),
          'success'
        ),
      onError: (error) =>
        runToast(
          error.error,
          t('auth.pages.forgot_password.toast.error.api.title'),
          'error'
        ),
    })
  })

  return (
    <Center w="100%" h="100%">
      <Window
        title={t('auth.pages.forgot_password.window_title')}
        onClick={() => navigate('/auth/signin')}
      >
        <form onSubmit={onSubmit}>
          <Stack mt={4} minW="340px" w="340px" spacing={5}>
            <Alert status="info" flexDirection="column" alignItems="flex-start">
              <Flex>
                <AlertIcon />
                <AlertTitle fontSize="xs">
                  {t('auth.pages.forgot_password.alert.title')}
                </AlertTitle>
              </Flex>
              <AlertDescription fontSize="xs">
                {t('auth.pages.forgot_password.alert.description')}
              </AlertDescription>
            </Alert>
            <Controller
              control={control}
              name="email"
              render={({ field, fieldState }) => (
                <InputGroup display="flex" flexDirection="column">
                  <Text fontSize="sm">
                    * {t('auth.pages.forgot_password.form.email.label')}
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
            <Button
              isLoading={isLoading}
              type="submit"
              onClick={() =>
                runToast(
                  formState.errors,
                  t('auth.pages.forgot_password.toast.error.zod.title'),
                  'error'
                )
              }
            >
              {t('auth.pages.forgot_password.form.submit_button.label')}
            </Button>
          </Stack>
        </form>
      </Window>
    </Center>
  )
}

export default ForgotPassword
