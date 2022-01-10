import React from 'react'
import ThemeProvider from '@workcode/components'
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'

import { NotFound, Index } from './other'
import { UserConfig } from './config'
import { Menu, Wait, Editor } from './workspace'
import { ChangePassword, ForgotPassword, SignIn, SignUp } from './auth'
import guardian from './guardian'

export function App(): JSX.Element {
  return (
    <ThemeProvider>
      <Routes>
        <Route index element={<Index />} />
        <Route path="workspace" element={guardian(<Outlet />)}>
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
        <Route path="config" element={guardian(<UserConfig />)} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
