import {AuthLayout} from '@/layouts/AuthLayout';
import {ForgotPasswordForm} from '@/components/auth/ForgotPasswordForm';

export const ForgotPasswordPage = () => {
    return (
        <AuthLayout>
            <ForgotPasswordForm/>
        </AuthLayout>
    )
}