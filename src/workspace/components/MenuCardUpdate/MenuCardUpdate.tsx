import React, { useState } from 'react'
import {
  MenuItem,
  useDisclosure,
  Button,
  Input,
  InputGroup,
  Stack,
  Textarea,
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
import { EditIcon } from '@chakra-ui/icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { produce } from 'immer'

import { FilterSelect } from '../../../common/components'
import { CodeType, WorkspaceType } from '../../schemas'
import { CodeTypeOption, codeTypeOptions } from '../../utils'
import { useToast } from '../../../common/hooks'
import {
  updateWorkspace,
  Form,
  FormType,
  Fail,
} from '../../api/updateWorkspace'
import { useWorkspaces } from '../../hooks/useWorkspaces'

interface MenuCardUpdateProps {
  workspace: WorkspaceType
}

export function MenuCardUpdate(props: MenuCardUpdateProps): JSX.Element {
  const { workspace } = props
  const { onOpen, onClose, isOpen } = useDisclosure()
  const { workspaces, setWorkspaces } = useWorkspaces()
  const [isLoading, setIsLoading] = useState(false)
  const runToast = useToast()
  const { control, formState, handleSubmit, reset, setValue } = useForm({
    resolver: zodResolver(Form),
    defaultValues: {
      id: workspace.id,
      name: workspace.name,
      description: workspace.description,
      code: workspace.code,
    },
  })

  const replaceWorkspace = (workspace: WorkspaceType) => {
    setWorkspaces(
      produce(workspaces, (draft) => {
        const index = draft.findIndex((w) => w.id === workspace.id)
        draft[index] = workspace
      })
    )
  }

  const onSubmit = handleSubmit<FormType>(async (data) => {
    setIsLoading(true)
    try {
      const response = await updateWorkspace(data)
      replaceWorkspace(response.workspace)
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
      <MenuItem onClick={onOpen}>
        <EditIcon mr={4} /> Update
      </MenuItem>
      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={onSubmit}>
            <ModalHeader>Update Workspace</ModalHeader>
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
                        identifer="value"
                        isDisabled={isLoading}
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
                update
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}

export default MenuCardUpdate
