import { useMemo } from 'react'
import {
  DeepPartial,
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
  UnpackNestedValue,
  useForm,
  UseFormProps,
} from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { ZodObject } from 'zod'

import { typo } from '../../utils'

type DefaultValues = Record<string, any>

export const useQueryForm = <T extends FieldValues = FieldValues, C = any>(
  init: UseFormProps<T, C>,
  schema: ZodObject<T>
) => {
  const [query, setQuery] = useSearchParams()
  const defaultValues = useMemo(() => {
    const defaultValues: DefaultValues = {}

    if (init.defaultValues) {
      for (const [key, value] of Object.entries(init.defaultValues)) {
        try {
          const parsed = schema.shape[key].parse(
            typo(typeof value, query.get(key))
          )
          defaultValues[key] = parsed
        } catch (error) {
          defaultValues[key] = value
        }
      }
    }

    return defaultValues as UnpackNestedValue<DeepPartial<T>>
  }, [])
  const form = useForm<T, C>({
    ...init,
    defaultValues: defaultValues,
  })

  const handleSubmit = (
    onValid: SubmitHandler<T>,
    onInvalid?: SubmitErrorHandler<T> | undefined
  ) => {
    return form.handleSubmit((data) => {
      setQuery(data)
      onValid(data)
    }, onInvalid)
  }

  return { ...form, handleSubmit }
}

export default useQueryForm
