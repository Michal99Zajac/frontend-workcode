import { workspaces, currentUser } from '../../../fixtures'

import { Response, Form, Fail } from './schema'

export const getWorkspaces = (form: Form): Promise<Response> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        workspaces: workspaces
          .filter(
            (workspace) =>
              workspace.admin.id === currentUser.id ||
              workspace.contributors.find(
                (contributor) => contributor.id === currentUser.id
              )
          )
          .filter((workspace) =>
            workspace.name.toLowerCase().includes(form.workspace.toLowerCase())
          )
          .filter((workspace) =>
            form.self ? workspace.admin.id === currentUser.id : true
          )
          .filter((workspace) =>
            `${workspace.admin.firstname} ${workspace.admin.lastname}`
              .toLowerCase()
              .includes(form.owner.toLowerCase())
          )
          .filter((workspace) =>
            form.code === 'ALL' ? true : workspace.code === form.code
          ),
      })

      reject({
        error: 'Something went wrong.',
      } as Fail)
    }, 500)
  })

export default getWorkspaces
