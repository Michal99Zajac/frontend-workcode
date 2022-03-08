import React from 'react'
import ThemeProvider from '@workcode/components'
import { ErrorBoundary } from 'react-error-boundary'

import { Error } from './other'
import { ToastProvider } from './common/context'
import Guardian from './Guardian'
import { AppRoutes } from './Routes'
import './App.scss'

export function App(): JSX.Element {
  return (
    <ThemeProvider>
      <ErrorBoundary FallbackComponent={Error}>
        <ToastProvider>
          <Guardian>
            <AppRoutes />
          </Guardian>
        </ToastProvider>
      </ErrorBoundary>
    </ThemeProvider>
  )
}

export default App
