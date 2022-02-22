import React from 'react'
import { ChakraProvider as ThemeProvider } from '@chakra-ui/react'
import { ErrorBoundary } from 'react-error-boundary'

import { Error } from './other'
import { ToastProvider } from './common/context'
import Guardian from './Guardian'
import { AppRoutes } from './Routes'
import { workcodeTheme } from './theme'
import './App.scss'

export function App(): JSX.Element {
  return (
    <ThemeProvider theme={workcodeTheme}>
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
