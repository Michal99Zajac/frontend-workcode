import create from 'zustand'
import { devtools } from 'zustand/middleware'

import { FormType } from '../../api/getWorkspaces'

type UpdateQuery = (query: FormType) => void
interface WorkspaceQueryStore {
  query: FormType
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
