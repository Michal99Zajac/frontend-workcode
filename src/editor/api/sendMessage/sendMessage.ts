/* eslint-disable @typescript-eslint/no-unused-vars */
import { v4 } from 'uuid'

import { Form, Response, Fail } from './schema'

export const sendMessage = (form: Form) =>
  new Promise<Response>((resolve, reject) => {
    setTimeout(() => {
      const random = Math.floor(Math.random() * 10)

      if (random > 2) {
        resolve({
          messageId: v4(),
        })
      } else {
        reject({
          error: "Can't send message",
        } as Fail)
      }
    }, 200)
  })

export default sendMessage
