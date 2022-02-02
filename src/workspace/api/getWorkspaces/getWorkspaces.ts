import { ResponseType, FailType } from './schema'

const workspaces: ResponseType = {
  workspaces: [],
}

export const getWorkspaces = (): Promise<ResponseType> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(workspaces)

      reject({
        error: 'Something went wrong.',
      } as FailType)
    }, 3000)
  })

export default getWorkspaces
