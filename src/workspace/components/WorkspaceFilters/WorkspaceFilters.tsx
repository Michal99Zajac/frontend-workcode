import React, { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import {
  Button,
  Checkbox,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'

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
  const hoverBG = useColorModeValue('gray.50', 'gray.700')
  const runToast = useToast()
  const { handleSubmit, control, setValue, reset, getValues } = useForm({
    resolver: zodResolver(Form),
    defaultValues: {
      self: false,
      workspace: '',
      owner: '',
      code: FormCode.enum.ALL,
    },
  })

  const fetchWorkspaces = async (data: FormType) => {
    setIsLoading(true)

    try {
      const response = await getWorkspaces(data)
      setWorkspaces(response.workspaces)
    } catch (error) {
      const fail = Fail.parse(error)
      runToast(fail, 'Error', 'error')
    }

    setIsLoading(false)
  }

  const onSubmit = handleSubmit(fetchWorkspaces)

  useEffect(() => {
    fetchWorkspaces(Form.parse(getValues()))
  }, [])

  return (
    <form onSubmit={onSubmit}>
      <HStack>
        <Tooltip label="Clear Filter" placement="top">
          <IconButton
            mr={8}
            colorScheme="gray"
            _hover={{
              backgroundColor: hoverBG,
              color: 'red.600',
            }}
            variant="ghost"
            aria-label="remove filter icon"
            icon={<DeleteIcon />}
            onClick={() => reset()}
          />
        </Tooltip>
        <Button type="submit">search</Button>
        <Controller
          name="workspace"
          control={control}
          render={({ field }) => (
            <InputGroup w="min-content">
              <InputLeftElement>
                <FolderIcon fill={iconFill} />
              </InputLeftElement>
              <Input {...field} placeholder="Workspace" w="200px" />
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
              <Input {...field} placeholder="Owner" w="240px" />
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