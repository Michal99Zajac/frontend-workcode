import React, { useEffect } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import {
  Button,
  Checkbox,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
} from '@chakra-ui/react'

import { useToast } from '../../../common/hooks'
import {
  getWorkspaces,
  Fail,
  Form,
  FormType,
  FormCode,
  FormCodeType,
} from '../../api/getWorkspaces'
import { WorkspaceType } from '../../schemas'
import { useAuth } from '../../../common/store'
import { FilterSelect } from '../../../common/components'
import { FolderIcon, UserIcon } from '../../../icons/common'

type SetWorkspaces = (workspaces: WorkspaceType[]) => void
type SetIsLoading = (isLoading: boolean) => void

interface WorkspaceFiltersProps {
  setIsLoading: SetIsLoading
  setWorkspaces: SetWorkspaces
}

export function WorkspaceFilters(props: WorkspaceFiltersProps): JSX.Element {
  const { setWorkspaces, setIsLoading } = props
  const iconFill = useColorModeValue('black', 'white')
  const runToast = useToast()
  const location = useLocation()
  const userId = useAuth((state) => state.user?.id)
  const [search, setSearch] = useSearchParams(
    new URLSearchParams({
      self: 'false',
      workspace: '',
      owner: '',
      code: FormCode.enum.ALL,
    })
  )
  const { handleSubmit, control, setValue } = useForm({
    resolver: zodResolver(Form),
    defaultValues: {
      self: search.get('self') === 'true' ? true : false,
      workspace: search.get('workspace') || '',
      owner: search.get('owner') || '',
      code: search.get('code') || FormCode.enum.ALL,
    },
  })

  const onSubmit = handleSubmit<FormType>(async (data) => {
    setIsLoading(true)

    if (!userId) throw new Error('User is not authenticated')

    try {
      const response = await getWorkspaces(data)
      setSearch(
        new URLSearchParams({
          workspace: data.workspace,
          self: data.self.toString(),
          owner: data.owner,
          code: data.code,
        })
      )
      setWorkspaces(response.workspaces)
    } catch (error) {
      const fail = Fail.parse(error)
      runToast(fail, 'Error', 'error')
    }
    setIsLoading(false)
  })

  useEffect(() => {
    onSubmit()
  }, [location.pathname])

  return (
    <form onSubmit={onSubmit}>
      <HStack>
        <Button type="submit">search</Button>
        <Controller
          name="workspace"
          control={control}
          render={({ field }) => (
            <InputGroup w="min-content">
              <InputLeftElement>
                <FolderIcon fill={iconFill} />
              </InputLeftElement>
              <Input
                {...field}
                placeholder="Workspace"
                transition="all 0.3s"
                w="10vw"
                sx={{
                  '&:focus': {
                    width: '25vw',
                  },
                }}
              />
            </InputGroup>
          )}
        />
        <Controller
          name="owner"
          control={control}
          render={({ field }) => (
            <InputGroup w="min-content">
              <InputLeftElement>
                <UserIcon fill={iconFill} />
              </InputLeftElement>
              <Input
                {...field}
                placeholder="Owner"
                transition="all 0.3s"
                w="10vw"
                sx={{
                  '&:focus': {
                    width: '25vw',
                  },
                }}
              />
            </InputGroup>
          )}
        />
        <Controller
          name="code"
          control={control}
          render={({ field }) => (
            <InputGroup w="min-content">
              <FilterSelect
                placeholder="Owner"
                transition="all 0.3s"
                identifer="value"
                options={FormCode.options.map((option) => ({
                  value: option,
                }))}
                onChange={(option) =>
                  setValue('code', option.value as FormCodeType)
                }
                value={{
                  value: FormCode.options.find(
                    (option) => field.value === option
                  ),
                }}
                w="260px"
              />
            </InputGroup>
          )}
        />
        <Controller
          name="self"
          control={control}
          render={({ field }) => (
            <Checkbox
              size="lg"
              isChecked={field.value}
              onChange={() => setValue('self', !field.value)}
            >
              only my
            </Checkbox>
          )}
        />
      </HStack>
    </form>
  )
}

export default WorkspaceFilters
