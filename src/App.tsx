import React, { Suspense } from 'react'
import { ChakraProvider as ThemeProvider } from '@chakra-ui/react'
import { ErrorBoundary } from 'react-error-boundary'

import { FullLoading } from 'common/components'
import { Error, Mobile } from './other'
import { ToastProvider } from './common/context'
import { AppRoutes } from './Routes'
import { workcodeTheme } from './theme'
import { Api } from './api'
import './App.scss'

export function App(): JSX.Element {
  return (
    <Suspense fallback={<FullLoading />}>
      <ThemeProvider theme={workcodeTheme}>
        <Mobile>
          <ErrorBoundary FallbackComponent={Error}>
            <ToastProvider>
              <Api>
                <AppRoutes />
              </Api>
            </ToastProvider>
          </ErrorBoundary>
        </Mobile>
      </ThemeProvider>
    </Suspense>
  )
}

export default App
