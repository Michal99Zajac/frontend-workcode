import { users, currentUser, workspaces } from '../../../fixtures'

import { FormType, ResponseType, FailType } from './schema'

export const getUsers = (form: FormType): Promise<ResponseType> =>
  new Promise((resolve, reject) => {
    const workspace = workspaces.find(
      (workspace) => workspace.id === form.workspaceId
    )

    if (!workspace && form.workspaceId !== undefined) {
      reject({
        error: 'Workspace doesnt exist',
      } as FailType)
    }

    const fetchedUsers = users.filter(
      (user) =>
        (`${user.firstname} ${user.lastname}`.includes(form.search) ||
          user.email.includes(form.search)) &&
        user.id !== currentUser.id &&
        !workspace?.contributors.find(
          (contributor) => contributor.id === user.id
        )
    )
    const page = form.page || 0
    const pagination = form.pagination ? Number(form.pagination) : 25
    const last = Math.floor(fetchedUsers.length / pagination)
    const navigation = {
      first: 0,
      last: last,
      current: page,
      next: page === last ? null : page + 1,
      previous: page === 0 ? null : page - 1,
    }

    setTimeout(() => {
      const response = {
        users: fetchedUsers.slice(
          page * pagination,
          page * pagination + pagination
        ),
        count: fetchedUsers.length,
        navigation: navigation,
      }
      resolve(response)

      reject({
        error: 'Something went wrong',
      } as FailType)
    }, 500)
  })

export default getUsers
