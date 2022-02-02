import dayjs from 'dayjs'

import UserImage from '../../../assets/mock/user.jpg'

import { FormType, ResponseType, FailType } from './schema'

export const updateWorkspace = (data: FormType): Promise<ResponseType> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        success: 'Workspace has been updated',
        workspace: {
          id: data.id,
          admin: {
            id: 'd04a84b7-b866-4b55-8d79-2f47edb07d13',
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

export default updateWorkspace
