import React from 'react'
import ThemeProvider from '@workcode/components'
import { ErrorBoundary } from 'react-error-boundary'

import { Error } from './other'
import Guardian from './Guardian'
import { AppRoutes } from './Routes'

import './App.scss'

export function App(): JSX.Element {
  return (
    <ThemeProvider>
      <ErrorBoundary FallbackComponent={Error}>
        <Guardian>
          <AppRoutes />
        </Guardian>
      </ErrorBoundary>
    </ThemeProvider>
  )
}

export default App
