import { v4 } from 'uuid'
import dayjs from 'dayjs'

import { CodeType } from '../../../common/schemas'
import { Workspace } from '../../schemas'
import { currentUser, workspaces } from '../../../fixtures'

import { Form, Response, Fail } from './schema'

export const createWorkspace = (data: Form): Promise<Response> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const workspace: Workspace = {
        _id: v4(),
        author: currentUser,
        code: CodeType.parse(data.code),
        name: data.name,
        createdAt: dayjs().toDate().toString(),
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
