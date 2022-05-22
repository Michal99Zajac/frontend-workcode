import React, { useEffect } from 'react'
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
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { FilterSelect } from 'common/components'
import { CodeType } from 'common/schemas'
import { CodeTypeOption, codeTypeOptions } from 'workspace/utils'
import { useToast } from 'common/hooks'
import { useWorkspace } from 'workspace/api/useWorkspace'
import { useWorkspaceUpdate, Form } from 'workspace/api/useWorkspaceUpdate'
import { useWorkspaceQuery } from 'workspace/store'

export function Update(): JSX.Element {
  const { workspaceId } = useParams()
  const naviagate = useNavigate()
  const { t } = useTranslation()
  const lastQuery = useWorkspaceQuery((store) => store.q)
  const runToast = useToast()
  const { data, isFetching } = useWorkspace({ _id: workspaceId ?? '' })
  const { mutate, isLoading } = useWorkspaceUpdate({ _id: workspaceId ?? '' })
  const { control, formState, handleSubmit, reset, setValue } = useForm<Form>({
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
          { message: t('workspace.pages.update.toast.success.api.message') },
          t('workspace.pages.update.toast.success.api.title'),
          'success'
        )
      },
      onError: (error) => {
        runToast(
          error.error,
          t('workspace.pages.update.toast.error.api.title'),
          'error'
        )
      },
    })
  })

  useEffect(() => {
    if (data)
      reset({
        name: data.name,
        code: data.code,
      })
  }, [data])

  return (
    <Modal onClose={() => naviagate(`/workspace${lastQuery}`)} isOpen={true}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={onSubmit}>
          <ModalHeader>{t('workspace.pages.update.header')}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={3} align="flex-end">
              <Controller
                control={control}
                name="name"
                render={({ field, fieldState }) => (
                  <InputGroup display="flex" flexDirection="column">
                    <Text fontSize="sm">
                      * {t('workspace.pages.update.form.name.label')}
                    </Text>
                    <Input
                      isDisabled={isLoading || isFetching}
                      placeholder={t(
                        'workspace.pages.update.form.name.placeholder'
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
                      * {t('workspace.pages.update.form.code.label')}
                    </Text>
                    <FilterSelect
                      identifer="value"
                      isDisabled={isLoading || isFetching}
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
              isLoading={isLoading || isFetching}
              width="100px"
              onClick={() =>
                runToast(
                  formState.errors,
                  t('workspace.pages.update.toast.error.zod.title'),
                  'error'
                )
              }
              type="submit"
            >
              {t('workspace.pages.update.form.submit_button.content')}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default Update
