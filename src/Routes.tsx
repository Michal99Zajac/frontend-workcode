/* eslint-disable prettier/prettier */
import React from 'react'
import { useRoutes, RouteObject } from 'react-router-dom'

import { MainLayout, WorkspaceLayout } from './common/components'
import { Main, NotFound } from './other'
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
    element: <MainLayout />,
    permissions: [],
    forLogged: true,
    auth: false,
    children: [
      {
        index: true,
        element: <Main />,
      },
    ],
  },
  {
    path: '/workspace',
    element: <WorkspaceLayout />,
    permissions: ['USER'],
    redirect: '/auth/signin',
    forLogged: true,
    auth: true,
    message: 'You should be sign in!',
    children: [
      {
        index: true,
        element: <Menu />,
      },
      {
        path: ':workspaceId',
        children: [
          {
            index: true,
            element: <Editor />,
          },
          {
            path: 'wait',
            element: <Wait />,
          },
        ],
      },
    ],
  },
  {
    path: '/auth',
    element: <MainLayout />,
    permissions: [],
    redirect: '/',
    forLogged: false,
    auth: false,
    message: 'You are logged',
    children: [
      {
        index: true,
        element: <SignIn />,
      },
      {
        path: 'change-password/:token',
        element: <ChangePassword />,
      },
      {
        path: 'forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
    ],
  },
  {
    path: '/config',
    element: <WorkspaceLayout />,
    permissions: ['USER'],
    redirect: '/',
    forLogged: true,
    auth: true,
    message: 'You should be sign in!',
    children: [
      {
        index: true,
        element: <UserConfig />,
      },
    ],
  },
  {
    path: '*',
    element: <MainLayout />,
    permissions: [],
    redirect: '/',
    forLogged: true,
    auth: false,
    children: [
      {
        path: '*',
        element: <NotFound />,
      },
    ],
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
