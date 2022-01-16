import UserImage from '../../../assets/mock/user.jpg'

import { Form, Response } from './types'

export const fetchUser = (form: Form): Promise<Response> => {
  return new Promise<Response>((resolve) => {
    setTimeout(() => {
      resolve({
        id: form.id,
        email: 'admin@example.com',
        name: 'Jhon',
        lastname: 'Snow',
        src: UserImage,
      })
    }, 1000)
  })
}

export default fetchUser
