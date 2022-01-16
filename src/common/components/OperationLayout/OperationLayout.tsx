import React from 'react'

interface OperationLayoutProps {
  children: React.ReactNode
}

export function OperationLayout(props: OperationLayoutProps): JSX.Element {
  const { children } = props
  return <div>Operation Layout {children}</div>
}

export default OperationLayout
