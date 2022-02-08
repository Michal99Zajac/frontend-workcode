import React, { useCallback } from 'react'
import { v4 } from 'uuid'

interface SkeletonsProps {
  children: React.ReactNode
  amount: number
  isLoaded: boolean
}

type SkeletonJSX = () => JSX.Element

export const Skeletons =
  (Skeleton: SkeletonJSX) =>
  (props: SkeletonsProps): JSX.Element => {
    const { isLoaded, children, amount } = props

    const getSkeletons = useCallback(() => {
      const array = Array(amount)
        .fill(0)
        .map(() => v4())

      return array.map((element) => <Skeleton key={element} />)
    }, [amount])

    if (!isLoaded) return <>{getSkeletons()}</>

    return <>{children}</>
  }

export default Skeletons
