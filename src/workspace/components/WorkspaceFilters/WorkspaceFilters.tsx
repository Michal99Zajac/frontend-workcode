import React from 'react'
// import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, UseFormReturn } from 'react-hook-form'
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
import { useTranslation } from 'react-i18next'

import { Form, Code } from 'workspace/api/useWorkspaces'
import { FilterSelect } from 'common/components'
import { FolderIcon, UserIcon } from 'icons/common'

interface WorkspaceFiltersProps {
  form: UseFormReturn<Form>
  onSubmit: (data: Form) => void
}

export function WorkspaceFilters(props: WorkspaceFiltersProps): JSX.Element {
  const iconFill = useColorModeValue('black', 'white')
  const hoverBG = useColorModeValue('gray.50', 'gray.700')

  const { form, onSubmit } = props
  const { t } = useTranslation()
  const { control, reset, setValue, handleSubmit } = form

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <HStack>
        <Tooltip
          label={t('workspace.components.workspace_filters.tooltip_label')}
          placement="top"
        >
          <IconButton
            colorScheme="gray"
            _hover={{
              backgroundColor: hoverBG,
              color: 'red.600',
            }}
            aria-label="remove filter icon"
            icon={<DeleteIcon />}
            onClick={() => reset()}
          />
        </Tooltip>
        <Button type="submit">
          {t('workspace.components.workspace_filters.search_button')}
        </Button>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <InputGroup w="min-content">
              <InputLeftElement>
                <FolderIcon fill={iconFill} />
              </InputLeftElement>
              <Input
                {...field}
                placeholder={t(
                  'workspace.components.workspace_filters.form.name.placeholder'
                )}
                w="260px"
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
                placeholder={t(
                  'workspace.components.workspace_filters.form.owner.placeholder'
                )}
                w="260px"
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
                placeholder={t(
                  'workspace.components.workspace_filters.form.code.placeholder'
                )}
                transition="all 0.3s"
                identifer="value"
                options={Code.options.map((option) => ({
                  value: option,
                }))}
                onChange={(option) => setValue('code', option.value as Code)}
                value={{
                  value: Code.options.find((option) => field.value === option),
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
              {t('workspace.components.workspace_filters.form.self.label')}
            </Checkbox>
          )}
        />
      </HStack>
    </form>
  )
}

export default WorkspaceFilters
