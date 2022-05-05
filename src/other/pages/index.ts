import { MainLayout } from 'common/layout'

import { NotFound } from './404'
import { Main } from './Main'

export const NotFoundWithLayout = MainLayout(NotFound)
export const MainWithLayout = MainLayout(Main)
export { Error } from './Error'
