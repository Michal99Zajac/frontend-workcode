import UserImage from '../../../assets/mock/user.jpg'

import { FormType, ResponseType } from './schema'

export const fetchUser = (form: FormType): Promise<ResponseType> => {
  return new Promise<ResponseType>((resolve) => {
    setTimeout(() => {
      resolve({
        id: form.id,
        email: 'admin@example.com',
        firstname: 'Jhon',
        lastname: 'Snow',
        src: UserImage,
      })
    }, 1000)
  })
}

export default fetchUser
