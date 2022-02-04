import { workspaces, currentUser } from '../../../fixtures'

import { ResponseType, FailType } from './schema'

export const getWorkspaces = (): Promise<ResponseType> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        workspaces: workspaces.filter(
          (workspace) =>
            workspace.admin.id === currentUser.id ||
            workspace.contributors.find(
              (contributor) => contributor.id === currentUser.id
            )
        ),
      })

      reject({
        error: 'Something went wrong.',
      } as FailType)
    }, 3000)
  })

export default getWorkspaces
