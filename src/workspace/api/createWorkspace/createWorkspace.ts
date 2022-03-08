import { v4 } from 'uuid'
import dayjs from 'dayjs'

import { CodeType, Workspace } from '../../schemas'
import { currentUser, workspaces } from '../../../fixtures'

import { Form, Response, Fail } from './schema'

export const createWorkspace = (data: Form): Promise<Response> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const workspace: Workspace = {
        id: v4(),
        admin: currentUser,
        code: CodeType.parse(data.code),
        name: data.name,
        description: data.description,
        createdAt: dayjs().toDate(),
        contributors: [],
      }
      workspaces.push(workspace)
      resolve({
        success: 'Workspace has been created',
        workspace: workspace,
      })

      reject({ error: 'Something went wrong' } as Fail)
    }, 2000)
  })

export default createWorkspace
