import React from 'react'
import {
  Button,
  Input,
  InputGroup,
  Stack,
  Text,
  Textarea,
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
  const { mutate, isLoading } = useWorkspaceCreate()
  const { control, formState, handleSubmit, setValue } = useForm<Form>({
    resolver: zodResolver(Form),
    defaultValues: {
      name: '',
      description: '',
      code: 'JAVASCRIPT',
    },
  })

  const onSubmit = handleSubmit((data) => {
    mutate(data, {
      onSuccess: () => {
        runToast(
          { message: 'Workspace has been created' },
          'Success',
          'success'
        )
        navigate(`/workspace${lastQuery}`)
      },
      onError: (error) => {
        runToast(error.error, 'Error', 'error')
      },
    })
  })

  return (
    <Modal onClose={() => navigate(`/workspace${lastQuery}`)} isOpen={true}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={onSubmit}>
          <ModalHeader>Create Workspace</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={3} align="flex-end">
              <Controller
                control={control}
                name="name"
                render={({ field, fieldState }) => (
                  <InputGroup display="flex" flexDirection="column">
                    <Text fontSize="sm">* Name</Text>
                    <Input
                      isDisabled={isLoading}
                      placeholder="my workspace name"
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
                name="description"
                render={({ field, fieldState }) => (
                  <InputGroup display="flex" flexDirection="column">
                    <Text fontSize="sm">* Description</Text>
                    <Textarea
                      isDisabled={isLoading}
                      placeholder="my workspace description..."
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
                    <Text fontSize="sm">* Code</Text>
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
              onClick={() => runToast(formState.errors, 'Error', 'error')}
              type="submit"
            >
              submit
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default Create
