import React from 'react'
import { FallbackProps } from 'react-error-boundary'

export function Error(props: FallbackProps): JSX.Element {
  const { error, resetErrorBoundary } = props
  return (
    <div>
      <div>{error.message}</div>
      <button onClick={resetErrorBoundary}>reset</button>
    </div>
  )
}

export default Error
