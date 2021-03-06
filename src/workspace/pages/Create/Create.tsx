import React from 'react'
import {
  Button,
  Input,
  InputGroup,
  Stack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { FilterSelect } from 'common/components'
import { useToast } from 'common/hooks'
import { CodeType } from 'common/schemas'
import { useWorkspaceCreate, Form } from 'workspace/api/useWorkspaceCreate'
import { codeTypeOptions, CodeTypeOption } from 'workspace/utils'
import { useWorkspaceQuery } from 'workspace/store'

export function Create(): JSX.Element {
  const lastQuery = useWorkspaceQuery((store) => store.q)
  const navigate = useNavigate()
  const runToast = useToast()
  const { t } = useTranslation()
  const { mutate, isLoading } = useWorkspaceCreate()
  const { control, formState, handleSubmit, setValue } = useForm<Form>({
    resolver: zodResolver(Form),
    defaultValues: {
      name: '',
      code: 'JAVASCRIPT',
    },
  })

  const onSubmit = handleSubmit((data) => {
    mutate(data, {
      onSuccess: () => {
        runToast(
          { message: t('workspace.pages.create.toast.success.api.message') },
          t('workspace.pages.create.toast.success.api.title'),
          'success'
        )
        navigate(`/workspace${lastQuery}`)
      },
      onError: (error) => {
        runToast(
          error.error,
          t('workspace.pages.create.toast.error.api.title'),
          'error'
        )
      },
    })
  })

  return (
    <Modal onClose={() => navigate(`/workspace${lastQuery}`)} isOpen={true}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={onSubmit}>
          <ModalHeader>{t('workspace.pages.create.header')}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={3} align="flex-end">
              <Controller
                control={control}
                name="name"
                render={({ field, fieldState }) => (
                  <InputGroup display="flex" flexDirection="column">
                    <Text fontSize="sm">
                      * {t('workspace.pages.create.form.name.label')}
                    </Text>
                    <Input
                      isDisabled={isLoading}
                      placeholder={t(
                        'workspace.pages.create.form.name.placeholder'
                      )}
                      onChange={field.onChange}
                      value={field.value}
                      isInvalid={fieldState.invalid}
                      ref={field.ref}
                    />
                  </InputGroup>
                )}
              />
              <Controller
                control={control}
                name="code"
                render={({ field }) => (
                  <InputGroup display="flex" flexDirection="column">
                    <Text fontSize="sm">
                      * {t('workspace.pages.create.form.code.label')}
                    </Text>
                    <FilterSelect
                      isDisabled={isLoading}
                      identifer="value"
                      onChange={(value) => {
                        const codeTypeOption = value as CodeTypeOption
                        setValue('code', CodeType.parse(codeTypeOption.value))
                      }}
                      value={codeTypeOptions.find(
                        (cto) => cto.value === field.value
                      )}
                      options={codeTypeOptions}
                    />
                  </InputGroup>
                )}
              />
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button
              isLoading={isLoading}
              width="100px"
              onClick={() =>
                runToast(
                  formState.errors,
                  t('workspace.pages.create.toast.error.zod.title'),
                  'error'
                )
              }
              type="submit"
            >
              {t('workspace.pages.create.form.submit_button.content')}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default Create
