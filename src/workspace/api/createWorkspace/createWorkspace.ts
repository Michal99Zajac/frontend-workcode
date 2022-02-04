import { v4 } from 'uuid'
import dayjs from 'dayjs'

import { CodeType, WorkspaceType } from '../../schemas'
import { currentUser, workspaces } from '../../../fixtures'

import { FormType, ResponseType, FailType } from './schema'

export const createWorkspace = (data: FormType): Promise<ResponseType> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const workspace: WorkspaceType = {
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

      reject({ error: 'Something went wrong' } as FailType)
    }, 2000)
  })

export default createWorkspace
