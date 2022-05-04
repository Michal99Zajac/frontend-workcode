import { AxiosResponse, AxiosError } from 'axios'

export type Response<R = any> = Promise<AxiosResponse<R>>
export type SuccessParser<S> = (data: any) => S
export type Parser<S> = {
  success: SuccessParser<S>
}
export const codec = async <S, M>(mutation: Response<M>, parser: Parser<S>) => {
  let data: AxiosResponse<M> | null = null
  try {
    data = await mutation
  } catch (error) {
    throw (error as AxiosError<any, any>).response?.data
  }

  try {
    return parser.success(data.data)
  } catch (error) {
    console.error(error)
    throw new Error(error as any)
  }
}

export default codec
