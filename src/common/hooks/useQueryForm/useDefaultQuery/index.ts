import { useMemo } from 'react'
import { DeepPartial, UnpackNestedValue } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { ZodObject } from 'zod'

import { parseQ } from '../parseQ'

export const useDefaultQuery = <T>(
  schema: ZodObject<any>,
  initDefaultValues?: UnpackNestedValue<DeepPartial<T>>
) => {
  const [query] = useSearchParams()

  return useMemo(() => {
    const defaultValues: Record<string, any> = {}

    if (initDefaultValues) {
      for (const [key, value] of Object.entries(initDefaultValues)) {
        try {
          const parsed = schema.shape[key].parse(
            parseQ(typeof value, query.get(key))
          )
          defaultValues[key] = parsed
        } catch (error) {
          defaultValues[key] = value
        }
      }
    }

    return defaultValues as UnpackNestedValue<DeepPartial<T>>
  }, [])
}

export default useDefaultQuery
