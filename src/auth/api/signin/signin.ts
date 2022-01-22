import {
  SignInSchemaType,
  SignInResponseType,
} from '../../schemas/SignInSchema'

export const signin = (form: SignInSchemaType): Promise<SignInResponseType> => {
  return new Promise<SignInResponseType>((resolve, reject) => {
    setTimeout(() => {
      if (
        form.email === correctUser.email &&
        form.password === correctUser.password
      ) {
        resolve({
          id: 'd04a84b7-b866-4b55-8d79-2f47edb07d13',
          email: form.email,
          token: 'afafasbfjhjbejb',
          permissions: ['USER'],
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
