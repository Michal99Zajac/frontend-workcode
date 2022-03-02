import React from 'react'
import { useRoutes, RouteObject, Navigate } from 'react-router-dom'

import { EditorWithLayout } from './editor'
import { MenuWithLayout, Contributors, Invite, Update } from './workspace'
import {
  ChangePasswordWithLayout,
  ForgotPasswordWithLayout,
  SignUpWithLayout,
  SignInWithLayout,
} from './auth'
import { UserConfigWithLayout } from './config'
import Guardian from './Guardian'
import { MainWithLayout, NotFoundWithLayout } from './other'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainWithLayout />,
  },
  {
    path: '/workspace',
    element: (
      <Guardian
        redirect="/auth/signin"
        auth
        permissions={['USER']}
        message="You should be sign in!"
      >
        <MenuWithLayout />
      </Guardian>
    ),
    children: [
      {
        path: ':workspaceId',
        children: [
          {
            index: true,
            element: <NotFoundWithLayout />,
          },
          {
            path: 'contributors',
            element: <Contributors />,
          },
          {
            path: 'invite',
            element: <Invite />,
          },
          {
            path: 'update',
            element: <Update />,
          },
        ],
      },
    ],
  },
  {
    path: '/editor',
    element: (
      <Guardian
        redirect="/auth/signin"
        auth
        permissions={['USER']}
        message="You should be sign in!"
        outlet
      />
    ),
    children: [
      {
        path: ':workspaceId',
        element: <EditorWithLayout />,
      },
    ],
  },
  {
    path: '/auth',
    element: (
      <Guardian
        redirect="/"
        notLogged
        permissions={[]}
        message="You are logged!"
        outlet
      />
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/" />,
      },
      {
        path: 'signin',
        element: <SignInWithLayout />,
      },
      {
        path: 'signup',
        element: <SignUpWithLayout />,
      },
      {
        path: 'change-password/:token',
        element: <ChangePasswordWithLayout />,
      },
      {
        path: 'forgot-password',
        element: <ForgotPasswordWithLayout />,
      },
    ],
  },
  {
    path: '/config',
    element: (
      <Guardian
        outlet
        auth
        message="You should be sign in!"
        redirect="/auth/signin"
        permissions={['USER']}
      />
    ),
    children: [
      {
        index: true,
        element: <UserConfigWithLayout />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundWithLayout />,
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
