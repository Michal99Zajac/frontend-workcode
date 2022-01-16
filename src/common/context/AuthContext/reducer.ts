import { produce } from 'immer'

import { AuthUser } from '../../types'

export interface AuthState {
  user: AuthUser | null
  token: string | null
}

export interface AuthAction extends Partial<AuthState> {
  type: 'SET_USER' | 'SET_TOKEN'
}

export const initialAuth: AuthState = {
  user: null,
  token: null,
}

export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case 'SET_USER':
      return produce(state, (draft) => {
        draft.user = action.user !== undefined ? action.user : state.user
      })
    case 'SET_TOKEN':
      return produce(state, (draft) => {
        draft.token = action.token !== undefined ? action.token : state.token
      })
    default:
      return state
  }
}
