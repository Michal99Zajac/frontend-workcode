import axios, { AxiosResponse, AxiosError } from 'axios'

import { env } from './env'

export const api = axios.create({
  baseURL: env.API_URL,
})

export type Response<R = any> = Promise<AxiosResponse<R>>
export type SuccessParser<S> = (data: any) => S
export type Parser<S> = {
  success: SuccessParser<S>
}
export const codec = async <S, M>(mutation: Response<M>, parser: Parser<S>) => {
  try {
    const data = await mutation
    return parser.success(data.data)
  } catch (error) {
    const err = error as AxiosError<any, any>
    throw err.response?.data
  }
}

export default api
