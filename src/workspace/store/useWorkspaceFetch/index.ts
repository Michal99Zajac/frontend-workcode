import create from 'zustand'
import { devtools } from 'zustand/middleware'

type noop = () => void
type Refetch = noop | null
type SetRefetch = (refetch: Refetch) => void
interface WorkspaceFetchStore {
  refetch: Refetch
  setRefetch: SetRefetch
}

export const useWorkspaceFetch = create<WorkspaceFetchStore>(
  devtools(
    (set) => ({
      refetch: null,
      setRefetch: (newRefetch) => set({ refetch: newRefetch }),
    }),
    {
      name: 'workspace refetch',
      serialize: {
        options: true,
      },
    }
  )
)

export default useWorkspaceFetch
