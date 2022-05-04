import { AxiosResponse } from 'axios'
import { ZodType } from 'zod'

export type Response<R = any> = Promise<AxiosResponse<R>>

export const createCodec =
  <S extends ZodType<any, any, any>, F extends ZodType<any, any, any>, R>(
    success: S,
    error: F
  ) =>
  async (response: Response<R>) => {
    try {
      const res = await response
      return success.parse(res.data)
    } catch (err) {
      console.error(err)
      throw error.parse((err as any).response.data)
    }
  }

export default createCodec
