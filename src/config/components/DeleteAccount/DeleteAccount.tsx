import React from 'react'
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'

import { Form, useDeleteMe } from 'config/api/useDeleteMe'
import { useToast } from 'common/hooks'

export function DeleteAccount(): JSX.Element {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { isLoading, mutate } = useDeleteMe()
  const { onOpen, onClose, isOpen } = useDisclosure()
  const { control, handleSubmit, formState, reset } = useForm<Form>({
    resolver: zodResolver(Form),
    defaultValues: {
      password: '',
    },
  })
  const runToast = useToast()

  const onSubmit = handleSubmit((data) => {
    mutate(data, {
      onSuccess: (response) => {
        runToast(
          response,
          t('config.components.delete_account.toast.success.api.title'),
          'success'
        )
        navigate('/')
      },
      onError: (error) => {
        runToast(
          error.message,
          t('config.components.delete_account.toast.error.api.title'),
          'error'
        )
        reset()
      },
    })
  })

  return (
    <Box>
      <Heading size="xl" mb={5}>
        {t('config.components.delete_account.heading')}
      </Heading>
      <Button onClick={onOpen}>
        {t('config.components.delete_account.delete_button')}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={onSubmit}>
            <ModalHeader>
              {t('config.components.delete_account.modal.header')}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack spacing={4}>
                <Alert
                  status="warning"
                  flexDirection="column"
                  alignItems="flex-start"
                >
                  <Flex>
                    <AlertIcon />
                    <AlertTitle fontSize="xs">
                      {t('config.components.delete_account.modal.alert.title')}
                    </AlertTitle>
                  </Flex>
                  <AlertDescription fontSize="xs">
                    {t(
                      'config.components.delete_account.modal.alert.description'
                    )}
                  </AlertDescription>
                </Alert>
                <Controller
                  control={control}
                  name="password"
                  render={({ field, fieldState }) => (
                    <Box>
                      <Text fontSize="sm">
                        {t(
                          'config.components.delete_account.modal.form.password.label'
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
              </Stack>
            </ModalBody>
            <ModalFooter>
              <Button
                isLoading={isLoading}
                type="submit"
                onClick={() =>
                  runToast(
                    formState.errors,
                    t('config.components.delete_account.toast.error.zod.title'),
                    'error'
                  )
                }
              >
                {t(
                  'config.components.delete_account.modal.form.submit_button.content'
                )}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default DeleteAccount
