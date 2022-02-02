import dayjs from 'dayjs'

import ProfileImage from '../../../assets/mock/user.jpg'

import { ResponseType, FailType } from './schema'

const workspaces: ResponseType = {
  workspaces: {
    my: [
      {
        id: '5025792a-410e-4b48-8f89-98a44c509aa2',
        admin: {
          id: 'd04a84b7-b866-4b55-8d79-2f47edb07d13',
          firstname: 'Jhon',
          lastname: 'Snow',
          email: 'jhonsnow@example.com',
          src: ProfileImage,
        },
        code: 'JAVASCRIPT',
        name: 'fsafsafas',
        description: 'fafsaffafsafa',
        createdAt: dayjs('2022-02-02T17:40:34.446Z').toDate(),
      },
      {
        id: '25cbd422-fcf9-4c4f-b116-b40ed85cb486',
        admin: {
          id: 'd04a84b7-b866-4b55-8d79-2f47edb07d13',
          firstname: 'Jhon',
          lastname: 'Snow',
          email: 'jhonsnow@example.com',
          src: ProfileImage,
        },
        code: 'JAVASCRIPT',
        name: 'safafafsa',
        description: 'safsafa',
        createdAt: dayjs('2022-02-02T17:40:41.641Z').toDate(),
      },
    ],
    other: [
      {
        id: 'bb1ff118-b1a4-42bb-843d-b094b07456ad',
        admin: {
          id: 'b099f288-56dc-41b5-9cdf-16d0b1f79fd1',
          firstname: 'Jhon',
          lastname: 'Snow',
          email: 'jhonsnow@example.com',
          src: ProfileImage,
        },
        code: 'PYTHON',
        name: 'sgs',
        description: 'sgsgs',
        createdAt: dayjs('2022-02-02T17:10:36.753Z').toDate(),
      },
      {
        id: '5035526c-af15-451a-8891-eacc9af49c5d',
        admin: {
          id: '80af75ef-489f-4774-abca-abe411c3d7d8',
          firstname: 'Jhon',
          lastname: 'Snow',
          email: 'jhonsnow@example.com',
          src: null,
        },
        code: 'JAVASCRIPT',
        name: 'fafa',
        description: 'fafasf',
        createdAt: dayjs('2022-02-02T17:40:18.570Z').toDate(),
      },
      {
        id: '391479a6-f806-4110-89fd-c2c1c7eb3009',
        admin: {
          id: '64cb49bf-f451-40d4-a804-647bd0faa4ea',
          firstname: 'Jhon',
          lastname: 'Snow',
          email: 'jhonsnow@example.com',
          src: null,
        },
        code: 'JAVASCRIPT',
        name: 'afafsa',
        description: 'fsafsafafas',
        createdAt: dayjs('2022-02-02T17:40:25.417Z').toDate(),
      },
    ],
  },
}

export const getWorkspaces = (): Promise<ResponseType> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(workspaces)

      reject({
        error: 'Something went wrong.',
      } as FailType)
    }, 3000)
  })

export default getWorkspaces
