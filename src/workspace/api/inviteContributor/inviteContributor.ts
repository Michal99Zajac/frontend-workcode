import { workspaces, users } from '../../../fixtures'

import { ResponseType, FailType, FormType } from './schema'

export const inviteContributor = (data: FormType): Promise<ResponseType> =>
  new Promise((resolve, reject) => {
    const user = users.find((user) => user.id === data.userId)
    const workspace = workspaces.find(
      (workspace) => workspace.id === data.workspaceId
    )

    setTimeout(() => {
      if (user && workspace && Math.floor(10 * Math.random()) !== 0) {
        resolve({
          success: 'Invited',
        })
      } else {
        reject({ error: 'Somethin went wrong' } as FailType)
      }
    }, 1500)
  })

export default inviteContributor
