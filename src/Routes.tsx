/* eslint-disable prettier/prettier */
import React from 'react'
import { useRoutes, RouteObject } from 'react-router-dom'

import { MainLayout, OperationLayout } from './common/components'
import { Index, NotFound } from './other'
import { Menu, Wait, Editor } from './workspace'
import { ChangePassword, ForgotPassword, SignIn, SignUp } from './auth'
import { UserConfig } from './config'
import { PermissionArrayType } from './permissions'

export interface WorkcodeRouteObject extends RouteObject {
  path: string // path is required
  permissions?: PermissionArrayType // permission to page
  redirect?: string // where to redirect
  forLogged: boolean // should logged user have access
  auth?: boolean // should user be logged
  message?: string // message for no permissions user
}

export const routes: WorkcodeRouteObject[] = [
  {
    path: '/',
    index: true,
    element: (
      <MainLayout>
        <Index />
      </MainLayout>
    ),
    permissions: [],
    forLogged: true,
    auth: false,
  },
  {
    path: '/workspace/menu',
    element: (
      <OperationLayout>
        <Menu />
      </OperationLayout>
    ),
    permissions: ['USER'],
    redirect: '/auth/signin',
    forLogged: true,
    auth: true,
    message: 'You should be sign in!',
  },
  {
    path: '/workspace/wait',
    element: (
      <OperationLayout>
        <Wait />
      </OperationLayout>
    ),
    permissions: ['USER'],
    redirect: '/auth/signin',
    forLogged: true,
    auth: true,
    message: 'You should be sign in!',
  },
  {
    path: '/workspace/editor',
    element: (
      <OperationLayout>
        <Editor />
      </OperationLayout>
    ),
    permissions: ['USER'],
    redirect: '/auth/signin',
    forLogged: true,
    auth: true,
    message: 'You should be sign in!',
  },
  {
    path: '/auth/change-password',
    element: (
      <MainLayout>
        <ChangePassword />
      </MainLayout>
    ),
    permissions: [],
    redirect: '/',
    forLogged: false,
    auth: false,
    message: 'You are logged',
  },
  {
    path: '/auth/forgot-password',
    element: (
      <MainLayout>
        <ForgotPassword />
      </MainLayout>
    ),
    permissions: [],
    redirect: '/',
    forLogged: false,
    auth: false,
    message: 'You are logged',
  },
  {
    path: '/auth/signin',
    element: (
      <MainLayout>
        <SignIn />
      </MainLayout>
    ),
    permissions: [],
    redirect: '/',
    forLogged: false,
    auth: false,
    message: 'You are logged',
  },
  {
    path: '/auth/signup',
    element: (
      <MainLayout>
        <SignUp />
      </MainLayout>
    ),
    permissions: [],
    redirect: '/',
    forLogged: false,
    auth: false,
    message: 'You are logged',
  },
  {
    path: '/config',
    element: (
      <OperationLayout>
        <UserConfig />
      </OperationLayout>
    ),
    permissions: ['USER'],
    redirect: '/',
    forLogged: true,
    auth: true,
    message: 'You should be sign in!',
  },
  {
    path: '*',
    element: (
      <MainLayout>
        <NotFound />
      </MainLayout>
    ),
    permissions: [],
    redirect: '/',
    forLogged: true,
    auth: false,
  },
]

export const AppRoutes = (): React.ReactElement<
  any,
  string | React.JSXElementConstructor<any>
> | null => {
  const appRoute = useRoutes(routes)

  return appRoute
}

export default AppRoutes
