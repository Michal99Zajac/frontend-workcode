import create from 'zustand'
import { devtools } from 'zustand/middleware'

import { Form } from '../../api/getWorkspaces'

type UpdateQuery = (query: Form) => void
interface WorkspaceQueryStore {
  query: Form
  update: UpdateQuery
  q: string
}

export const useWorkspaceQuery = create<WorkspaceQueryStore>(
  devtools(
    (set) => ({
      query: {
        workspace: '',
        owner: '',
        self: false,
        code: 'ALL',
      },
      update: (query) => {
        const parsedQuery = {
          ...query,
          self: query.self === false ? 'false' : 'true',
        }
        const q = '?' + new URLSearchParams(parsedQuery).toString()
        set({ query: query, q: q })
      },
      q: '',
    }),
    {
      name: 'workspace query',
      serialize: {
        options: true,
      },
    }
  )
)

export default useWorkspaceQuery
