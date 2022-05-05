import { workspaces, currentUser } from '../../../fixtures'

import { Response, Form, Fail } from './schema'

export const getWorkspaces = (form: Form): Promise<Response> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        workspaces: workspaces
          .filter(
            (workspace) =>
              workspace.author._id === currentUser._id ||
              workspace.contributors.find(
                (contributor) => contributor._id === currentUser._id
              )
          )
          .filter((workspace) =>
            workspace.name.toLowerCase().includes(form.workspace.toLowerCase())
          )
          .filter((workspace) =>
            form.self ? workspace.author._id === currentUser._id : true
          )
          .filter((workspace) =>
            `${workspace.author.name} ${workspace.author.lastname}`
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
