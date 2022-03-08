import React, { useCallback, useEffect, useState } from 'react'
import {
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
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useParams } from 'react-router-dom'

import { FilterSelect } from '../../../common/components'
import { CodeType } from '../../schemas'
import { CodeTypeOption, codeTypeOptions } from '../../utils'
import { useToast } from '../../../common/hooks'
import { updateWorkspace, Form, Fail } from '../../api/updateWorkspace'
import { getWorkspace } from '../../api'
import { useWorkspaceFetch, useWorkspaceQuery } from '../../store'

export function Update(): JSX.Element {
  const { workspaceId } = useParams()
  const naviagate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const refetchWorkspaces = useWorkspaceFetch((store) => store.refetch)
  const lastQuery = useWorkspaceQuery((store) => store.q)
  const runToast = useToast()
  const { control, formState, handleSubmit, reset, setValue } = useForm<Form>({
    resolver: zodResolver(Form),
    defaultValues: {
      id: '',
      name: '',
      description: '',
      code: CodeType.enum.JAVASCRIPT,
    },
  })

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true)
    try {
      const response = await updateWorkspace(data)
      runToast({ success: response.success }, 'Success', 'success')
    } catch (error) {
      const fail = Fail.parse(error)
      runToast(fail, 'Error', 'error')
    }
    setIsLoading(false)
  })

  const fetchWorkspace = useCallback(async () => {
    setIsLoading(true)

    if (!workspaceId) throw new Error('Workspace Id is not set')

    try {
      const response = await getWorkspace({ workspaceId: workspaceId })
      reset({
        id: response.workspace?.id,
        name: response.workspace?.name,
        description: response.workspace?.description,
        code: response.workspace?.code,
      })
    } catch (error) {
      const fail = Fail.parse(error)
      console.error(fail)
    }
    setIsLoading(false)
  }, [workspaceId])

  const onClose = () => {
    refetchWorkspaces && refetchWorkspaces()
    naviagate(`/workspace${lastQuery}`)
  }

  useEffect(() => {
    fetchWorkspace()
  }, [])

  return (
    <Modal onClose={onClose} isOpen={true}>
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
  )
}

export default Update
