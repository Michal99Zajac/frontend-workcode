import React, { useCallback } from 'react'
import { Skeleton } from '@chakra-ui/react'
import { v4 } from 'uuid'

interface WorkspaceCardGhostsProps {
  isLoaded: boolean
  children: React.ReactNode
  amount: number
}

export function WorkspaceCardGhosts(
  props: WorkspaceCardGhostsProps
): JSX.Element {
  const { isLoaded, children, amount } = props

  const getGhosts = useCallback(() => {
    const array = Array(amount)
      .fill(0)
      .map(() => v4())

    return array.map((element) => (
      <Skeleton key={element} h="200px" w="300px" />
    ))
  }, [amount])

  if (!isLoaded) return <>{getGhosts()}</>

  return <>{children}</>
}

export default WorkspaceCardGhosts
