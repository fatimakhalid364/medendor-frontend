import {AuthLayout} from '@/layouts/AuthLayout';
import {SignupForm} from '@/components/auth/SignupForm';

export const SignupPage = () => {
    return (
        <AuthLayout>
            <SignupForm/>
        </AuthLayout>
    )
}