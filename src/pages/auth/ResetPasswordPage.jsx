import {AuthLayout} from '@/layouts/AuthLayout';
import {ResetPasswordForm} from '@/components/auth/ResetPasswordForm';

export const ResetPasswordPage = () => {
    return (
        <AuthLayout>
            <ResetPasswordForm/>
        </AuthLayout>
    )
}