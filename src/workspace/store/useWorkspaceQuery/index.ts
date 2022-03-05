import create from 'zustand'
import { devtools } from 'zustand/middleware'

import { FormType } from '../../api/getWorkspaces'

type UpdateQuery = (query: FormType) => void
interface WorkspaceQueryStore {
  query: FormType
  update: UpdateQuery
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
      update: (query) => set({ query: query }),
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
