import { workspaces } from '../../../fixtures'

import { FormType, ResponseType } from './schema'

export const getWorkspace = (data: FormType): Promise<ResponseType> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const workspace = workspaces.find(
        (workspace) => workspace.id === data.workspaceId
      )

      if (workspace) {
        resolve({
          workspace:
            workspaces.find((workspace) => workspace.id === data.workspaceId) ||
            null,
        })
      } else {
        reject({
          error: 'Workspace doesnt exists',
        })
      }
    }, 6000)
  })

export default getWorkspace
