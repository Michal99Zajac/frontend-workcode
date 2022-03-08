import { Form, Response, Fail } from './schema'

let count = 0

export const accessWorkspace = (data: Form): Promise<Response> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      count++

      if (count > 2) {
        count = 0
        resolve({
          id: data.workspaceId,
          status: Math.floor(Math.random() * 2) % 2 === 0 ? 'READY' : 'DENIAL',
        })
      } else {
        resolve({
          id: data.workspaceId,
          status: 'PENDING',
        })
      }

      reject({
        error: 'Workspace doesnt exists',
      } as Fail)
    }, 1000)
  })

export default accessWorkspace
