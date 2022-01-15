import React from 'react'
import { useRoutes, RouteObject } from 'react-router-dom'

import { Index, NotFound } from './other'
import { Menu, Wait, Editor } from './workspace'
import { ChangePassword, ForgotPassword, SignIn, SignUp } from './auth'
import { UserConfig } from './config'
import { Permission } from './permissions'

export interface WorkcodeRouteObject extends RouteObject {
  path: string // path is required
  permissions?: Permission[] // permission to page
  redirect?: string // where to redirect
  forLogged: boolean // should logged user have access
  auth?: boolean // should user be logged
  message?: string // message for no permissions user
}

export const routes: WorkcodeRouteObject[] = [
  {
    path: '/',
    index: true,
    element: <Index />,
    permissions: [],
    forLogged: true,
    auth: false,
  },
  {
    path: '/workspace/menu',
    element: <Menu />,
    permissions: [Permission.USER],
    redirect: '/auth/signin',
    forLogged: true,
    auth: true,
    message: 'You should be sign in!',
  },
  {
    path: '/workspace/wait',
    element: <Wait />,
    permissions: [Permission.USER],
    redirect: '/auth/signin',
    forLogged: true,
    auth: true,
    message: 'You should be sign in!',
  },
  {
    path: '/workspace/editor',
    element: <Editor />,
    permissions: [Permission.USER],
    redirect: '/auth/signin',
    forLogged: true,
    auth: true,
    message: 'You should be sign in!',
  },
  {
    path: '/auth/change-password',
    element: <ChangePassword />,
    permissions: [],
    redirect: '/',
    forLogged: false,
    auth: false,
    message: 'You are logged',
  },
  {
    path: '/auth/forgot-password',
    element: <ForgotPassword />,
    permissions: [],
    redirect: '/',
    forLogged: false,
    auth: false,
    message: 'You are logged',
  },
  {
    path: '/auth/signin',
    element: <SignIn />,
    permissions: [],
    redirect: '/',
    forLogged: false,
    auth: false,
    message: 'You are logged',
  },
  {
    path: '/auth/signup',
    element: <SignUp />,
    permissions: [],
    redirect: '/',
    forLogged: false,
    auth: false,
    message: 'You are logged',
  },
  {
    path: '/config',
    element: <UserConfig />,
    permissions: [Permission.USER],
    redirect: '/',
    forLogged: true,
    auth: true,
    message: 'You should be sign in!',
  },
  {
    path: '*',
    element: <NotFound />,
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
