import { v4 } from 'uuid'
import dayjs from 'dayjs'

import UserImage from '../../../assets/mock/user.jpg'

import { FormType, ResponseType, FailType } from './schema'

export const createWorkspace = (data: FormType): Promise<ResponseType> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        success: 'Workspace has been created',
        workspace: {
          id: v4(),
          admin: {
            id: v4(),
            firstname: 'Jhon',
            lastname: 'Snow',
            email: 'jhonsnow@example.com',
            src: UserImage,
          },
          code: data.code,
          name: data.name,
          description: data.description,
          createdAt: dayjs().toDate(),
        },
      })

      reject({ error: 'Something went wrong' } as FailType)
    }, 2000)
  })

export default createWorkspace
