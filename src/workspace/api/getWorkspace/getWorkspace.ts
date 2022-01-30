import src from '../../../assets/mock/user.jpg'

import { FormType, ResponseType } from './schema'

export const getWorkspace = (data: FormType): Promise<ResponseType> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        workspace: {
          id: data.workspaceId,
          admin: {
            id: '73ac0aac-9d21-4163-9951-837627ebd461',
            firstname: 'Jhon',
            lastname: 'Snow',
            email: 'jhonsnow@example.com',
            src: src,
          },
          code: 'JAVASCRIPT',
          name: 'IT Workspace',
          description: `
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Nullam venenatis vestibulum lacus nec ullamcorper. Nam
            ultrices rutrum metus at ornare. Vivamus et purus sit amet
            nibh fermentum malesuada. Quisque id ipsum lorem. Integer
            condimentum mi at gravida ornare. Nunc efficitur nec tellus id
            sollicitudin. Duis lacinia, dolor a aliquet pulvinar, felis
            nibh finibus enim, vitae maximus ipsum tellus ac neque.
            Praesent ac ipsum a odio tempor faucibus congue nec justo. Sed
            nec mattis quam. Morbi finibus semper ante sit amet egestas.
            Sed a efficitur eros, quis varius augue. In est purus,
            dignissim sed erat at, commodo finibus massa. Sed sed libero
            vestibulum, molestie lectus sit amet, iaculis ipsum.
            Pellentesque at felis turpis.
          `,
        },
      })

      reject({
        error: 'Workspace doesnt exists',
      })
    }, 6000)
  })

export default getWorkspace
