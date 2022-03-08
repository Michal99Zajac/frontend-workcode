import { v4 } from 'uuid'
import { faker } from '@faker-js/faker'
import dayjs from 'dayjs'

import { User, AuthUser } from './common/schemas'
import { Workspace, CodeType, WorkspaceRole } from './workspace/schemas'

export let users: User[] = Array(100)
  .fill(null)
  .map(() => ({
    email: faker.internet.email(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    id: v4(),
    src: faker.image.avatar(),
  }))

export let currentUser: User = users[50]

export const authUser: AuthUser = {
  email: currentUser.email,
  id: currentUser.id,
  permissions: ['USER'],
}

export let workspaces: Workspace[] = Array(100)
  .fill(null)
  .map(() => ({
    id: v4(),
    admin: users[Math.floor(10 * Math.random()) + 45],
    code: CodeType.parse(
      ['BASH', 'JAVASCRIPT', 'PYTHON'][Math.floor(3 * Math.random())]
    ),
    name: faker.random.words(),
    description: faker.lorem.text(200),
    createdAt: faker.date.between(
      dayjs().subtract(2, 'year').toString(),
      dayjs().toString()
    ),
    contributors: users
      .slice(
        Math.floor(90 * Math.random()),
        Math.floor(90 * Math.random()) + 10
      )
      .map((user) => ({
        ...user,
        role: WorkspaceRole.options[Math.floor(3 * Math.random())],
      })),
  }))

export const setWorkspaces = (newWorkspaces: Workspace[]): void => {
  workspaces = newWorkspaces
}

export const setCurrentUser = (newCurrentUser: User): void => {
  currentUser = newCurrentUser
}

export const setUsers = (newUsers: User[]): void => {
  users = newUsers
}
