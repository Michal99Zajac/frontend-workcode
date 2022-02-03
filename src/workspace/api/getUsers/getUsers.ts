import { v4 } from 'uuid'
import { faker } from '@faker-js/faker'

import { UserType } from '../../../common/schemas'

import { FormType, ResponseType, FailType } from './schema'

export const getUsers = (form: FormType): Promise<ResponseType> =>
  new Promise((resolve, reject) => {
    const fetchedUsers = users.filter(
      (user) =>
        `${user.firstname} ${user.lastname}`.includes(form.search) ||
        user.email.includes(form.search)
    )
    const page = form.page || 0
    const pagination = form.pagination ? Number(form.pagination) : 25
    const last = Math.floor(fetchedUsers.length / pagination)
    const navigation = {
      first: 0,
      last: last,
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
      console.log(response)
      resolve(response)

      reject({
        error: 'Something went wrong',
      } as FailType)
    }, 500)
  })

export default getUsers

const users: UserType[] = Array(1000)
  .fill(null)
  .map(() => ({
    email: faker.internet.email(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    id: v4(),
    src: faker.image.avatar(),
  }))
