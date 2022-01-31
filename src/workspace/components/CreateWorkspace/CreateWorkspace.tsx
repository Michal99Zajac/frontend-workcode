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
  Box,
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { ModalWindow, Select } from '../../../common/components'
import {
  Form,
  FormType,
  Fail,
  createWorkspace,
} from '../../api/createWorkspace'
import { useToast } from '../../../common/hooks'
import { WorkspaceType } from '../../schemas'

type AddWorkspace = (workspace: WorkspaceType) => void

interface CreateWorkspaceProps {
  addWorkspaces: AddWorkspace
}

export function CreateWorkspace(props: CreateWorkspaceProps): JSX.Element {
  const { addWorkspaces } = props
  const [isLoading, setIsLoading] = useState(false)
  const runToast = useToast()
  const { onOpen, onClose, isOpen } = useDisclosure()
  const { control, formState, handleSubmit, reset } = useForm({
    resolver: zodResolver(Form),
    defaultValues: {
      name: '',
      description: '',
      code: 'JAVASCRIPT',
    },
  })

  const onSubmit = handleSubmit<FormType>(async (data) => {
    setIsLoading(true)
    try {
      const response = await createWorkspace(data)
      addWorkspaces(response.workspace)
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
      <ModalWindow title="Create Workspace" onClose={onClose} isOpen={isOpen}>
        <form onSubmit={onSubmit}>
          <Stack>
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
              render={({ field, fieldState }) => (
                <InputGroup display="flex" flexDirection="column">
                  <Text fontSize="sm">* Code</Text>
                  <Select
                    isDisabled={isLoading}
                    onChange={field.onChange}
                    value={field.value}
                    ref={field.ref}
                  />
                </InputGroup>
              )}
            />
            <Button
              isLoading={isLoading}
              onClick={() => runToast(formState.errors, 'Error', 'error')}
              type="submit"
            >
              submit
            </Button>
          </Stack>
        </form>
      </ModalWindow>
    </>
  )
}

export default CreateWorkspace
