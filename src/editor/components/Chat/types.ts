import { User } from 'common/schemas'
import { Message } from 'editor/schemas'

export interface ChatMessage {
  message: Message
  user: User
}
