import { workspaces, users } from '../../../fixtures'

import { Response, Fail, Form } from './schema'

export const inviteContributor = (data: Form): Promise<Response> =>
  new Promise((resolve, reject) => {
    const user = users.find((user) => user._id === data.userId)
    const workspace = workspaces.find(
      (workspace) => workspace._id === data.workspaceId
    )

    setTimeout(() => {
      if (user && workspace && Math.floor(10 * Math.random()) !== 0) {
        resolve({
          success: 'Invited',
        })
      } else {
        reject({ error: 'Somethin went wrong' } as Fail)
      }
    }, 1500)
  })

export default inviteContributor
