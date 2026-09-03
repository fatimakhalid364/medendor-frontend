import {AuthLayout} from '@/layouts/AuthLayout';
import {VerifyCodeForm} from '@/components/auth/VerifyCodeForm';

export const VerifyCodePage = () => {
    return (
        <AuthLayout>
            <VerifyCodeForm/>
        </AuthLayout>
    )
}