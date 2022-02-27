import React, { useCallback } from 'react'
import { v4 } from 'uuid'

interface SkeletonsProps {
  children: React.ReactNode
  amount: number
  isLoaded: boolean
}

export const Skeletons =
  <T,>(Skeleton: (props: T) => JSX.Element) =>
  (props: T & SkeletonsProps): JSX.Element => {
    const { isLoaded, children, amount, ...rest } = props

    const getSkeletons = useCallback(() => {
      const array = Array(amount)
        .fill(0)
        .map(() => v4())

      return array.map((element) => (
        <Skeleton {...(rest as any)} key={element} />
      ))
    }, [amount])

    if (!isLoaded) return <>{getSkeletons()}</>

    return <>{children}</>
  }

export default Skeletons
