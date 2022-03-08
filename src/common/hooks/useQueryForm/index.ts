import {
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
  UseFormProps,
} from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { ZodObject } from 'zod'

import useDefaultQuery from './useDefaultQuery'

interface Init<T extends FieldValues = FieldValues, C = any>
  extends UseFormProps<T, C> {
  schema: ZodObject<any>
}

export const useQueryForm = <T extends FieldValues = FieldValues, C = any>(
  init: Init<T, C>
) => {
  const [, setQuery] = useSearchParams()
  const defaultValues = useDefaultQuery(init.schema, init.defaultValues)
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
