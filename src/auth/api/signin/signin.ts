import { FormType, ResponseType } from './schema'

export const signin = (data: FormType): Promise<ResponseType> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        data.email === correctUser.email &&
        data.password === correctUser.password
      ) {
        resolve({
          user: {
            id: 'd04a84b7-b866-4b55-8d79-2f47edb07d13',
            email: data.email,
            permissions: ['USER'],
          },
          token: 'afafasbfjhjbejb',
        })
      }

      reject({
        email: 'email is required',
        password: 'password is too week',
      })
    }, 4000)
  })
}

export default signin

// TODO: remove after developing
const correctUser = {
  email: 'admin@example.com',
  password: 'password',
}
