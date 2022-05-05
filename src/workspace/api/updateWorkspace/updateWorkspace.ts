import { produce } from 'immer'

import { workspaces, setWorkspaces } from '../../../fixtures'

import { Form, Response, Fail } from './schema'

export const updateWorkspace = (data: Form): Promise<Response> =>
  new Promise((resolve, reject) => {
    const workspaceIndex = workspaces.findIndex(
      (workspace) => workspace._id === data.id
    )
    setTimeout(() => {
      if (workspaceIndex >= 0) {
        setWorkspaces(
          produce(workspaces, (draft) => {
            draft[workspaceIndex] = {
              ...draft[workspaceIndex],
              code: data.code,
              name: data.name,
            }
          })
        )
        resolve({
          success: 'Workspace has been updated',
          workspace: workspaces[workspaceIndex],
        })
      } else {
        reject({ error: 'Something went wrong' } as Fail)
      }
    }, 2000)
  })

export default updateWorkspace
