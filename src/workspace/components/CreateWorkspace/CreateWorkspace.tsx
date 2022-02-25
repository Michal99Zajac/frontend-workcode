import React, { useState } from 'react'
import {
  Button,
  IconButton,
  Input,
  InputGroup,
  Stack,
  useDisclosure,
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
import { AddIcon } from '@chakra-ui/icons'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { produce } from 'immer'

import { FilterSelect } from '../../../common/components'
import {
  Form,
  FormType,
  Fail,
  createWorkspace,
} from '../../api/createWorkspace'
import { useToast } from '../../../common/hooks'
import { WorkspaceType, CodeType } from '../../schemas'
import { codeTypeOptions, CodeTypeOption } from '../../utils'
import { useWorkspaces } from '../../hooks/useWorkspaces'

export function CreateWorkspace(): JSX.Element {
  const [isLoading, setIsLoading] = useState(false)
  const { setMyWorkspaces, workspaces } = useWorkspaces()
  const runToast = useToast()
  const { onOpen, onClose, isOpen } = useDisclosure()
  const { control, formState, handleSubmit, reset, setValue } = useForm({
    resolver: zodResolver(Form),
    defaultValues: {
      name: '',
      description: '',
      code: 'JAVASCRIPT',
    },
  })

  const addWorkspace = (workspace: WorkspaceType) => {
    setMyWorkspaces(
      produce(workspaces.my, (draft) => {
        draft.push(workspace)
      })
    )
  }

  const onSubmit = handleSubmit<FormType>(async (data) => {
    setIsLoading(true)
    try {
      const response = await createWorkspace(data)
      addWorkspace(response.workspace)
      reset()
      onClose()
      runToast({ success: response.success }, 'Success', 'success')
    } catch (error) {
      const fail = Fail.parse(error)
      runToast(fail, 'Error', 'error')
    }
    setIsLoading(false)
  })

  return (
    <>
      <IconButton
        size="md"
        aria-label="add workspace"
        icon={<AddIcon />}
        onClick={onOpen}
      />
      <Modal onClose={onClose} isOpen={isOpen}>
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
    </>
  )
}

export default CreateWorkspace
