import React from 'react'
import ThemeProvider from '@workcode/components'
import { Routes, Route, Navigate } from 'react-router-dom'

import { NotFound, Index, Error } from './other'
import { UserConfig } from './config'
import { Menu, Wait, Editor } from './workspace'
import { ChangePassword, ForgotPassword, SignIn, SignUp } from './auth'
import Guardian from './Guardian'

export function App(): JSX.Element {
  return (
    <ThemeProvider>
      <Guardian>
        <Routes>
          <Route path="/">
            <Route index element={<Index />} />
            <Route path="workspace">
              <Route path="menu" element={<Menu />} />
              <Route path="wait" element={<Wait />} />
              <Route path="editor" element={<Editor />} />
              <Route index element={<Navigate to="/workspace/menu" />} />
            </Route>
            <Route path="auth">
              <Route path="change-password" element={<ChangePassword />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="signin" element={<SignIn />} />
              <Route path="signup" element={<SignUp />} />
              <Route index element={<Navigate to="/auth/signin" />} />
            </Route>
            <Route path="config" element={<UserConfig />} />
            <Route path="error" element={<Error />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Guardian>
    </ThemeProvider>
  )
}

export default App
