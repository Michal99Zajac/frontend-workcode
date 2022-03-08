import { workspaces } from '../../../fixtures'

import { Form, Response, Fail } from './schema'

export const getWorkspace = (data: Form): Promise<Response> =>
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
        } as Fail)
      }
    }, 6000)
  })

export default getWorkspace
