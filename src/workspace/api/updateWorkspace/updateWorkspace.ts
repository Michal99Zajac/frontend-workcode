import { produce } from 'immer'

import { workspaces, setWorkspaces } from '../../../fixtures'

import { FormType, ResponseType, FailType } from './schema'

export const updateWorkspace = (data: FormType): Promise<ResponseType> =>
  new Promise((resolve, reject) => {
    const workspaceIndex = workspaces.findIndex(
      (workspace) => workspace.id === data.id
    )
    setTimeout(() => {
      if (workspaceIndex >= 0) {
        setWorkspaces(
          produce(workspaces, (draft) => {
            draft[workspaceIndex] = {
              ...draft[workspaceIndex],
              code: data.code,
              name: data.name,
              description: data.description,
            }
          })
        )
        resolve({
          success: 'Workspace has been updated',
          workspace: workspaces[workspaceIndex],
        })
      } else {
        reject({ error: 'Something went wrong' } as FailType)
      }
    }, 2000)
  })

export default updateWorkspace
