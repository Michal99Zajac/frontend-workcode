import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from 'react-query'

import './index.scss'
import App from './App'
import 'date'

export const queryClient = new QueryClient()

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </QueryClientProvider>,
  document.getElementById('root')
)
