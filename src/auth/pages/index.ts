import { MainLayout } from '../../common/layout'
import { ChangePassword } from './ChangePassword'
import { ForgotPassword } from './ForgotPassword'
import { SignIn } from './SignIn'
import { SignUp } from './SignUp'

export const ChangePasswordWithLayout = MainLayout(ChangePassword)
export const ForgotPasswordWithLayout = MainLayout(ForgotPassword)
export const SignInWithLayout = MainLayout(SignIn)
export const SignUpWithLayout = MainLayout(SignUp)
