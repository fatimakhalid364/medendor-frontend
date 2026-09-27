import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPasswordThunk } from '@/store/thunks/authThunks';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import {Input} from '@/components/ui/Input';
import {Button} from '@/components/ui/Button';
import styles from "./ResetPasswordForm.module.css";
import { validateResetPasswordForm } from '@/utils/formValidators';
import {MailIcon, LockIcon, EyeIcon, EyeOffIcon} from '@/components/icons';
import { toast } from "sonner";


export const ResetPasswordForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const resetToken = searchParams.get("token");

    // const { status, error } = useSelector(
    //     (state) => state.auth.requestStatus.login
    // );

    const [status, setStatus] = useState('idle');
    // const [error, setError] = useState(null);

    const loading = status === "pending";

    const [form, setForm] = useState({
        password: '',
        confirmPassword: '',
    });

    const [validationErrors, setValidationErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        // setError(null);
        setForm((prev) => ({
        ...prev,
        [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateResetPasswordForm(form);

        if (Object.keys(newErrors).length > 0) {
            setValidationErrors(newErrors);
            return;
        }
        setValidationErrors({});
        try {
            setStatus('pending');
            const res = await dispatch(resetPasswordThunk({newPassword: form.password, resetToken})).unwrap();
            console.log("response inside handleSubmit of reset password comp is", res);
            setStatus('fulfilled');
            toast.success(res.message, {
                duration: 5000,
            });
            navigate(`/authentication/login`);

        }catch(error){
            setStatus('rejected');
            // setError(error.message);
            toast.error(error, {
                duration: 5000,
            });
        }
    };

    return (
            <>
                <div className={styles.header}>
                    <h2>Reset Your Password</h2>
                    <p className={styles.subtitle}>Enter your new password below to secure your account.</p>
                </div>

                {/* {error && (
                    <div className={styles.alert} role="alert">
                        {error}
                    </div>
                )} */}

                <form className={styles.fields} onSubmit={handleSubmit} noValidate>

                    <Input
                        label="Password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={form.password}
                        onChange={handleChange}
                        error={validationErrors.password}
                        icon={<LockIcon />}
                        rightIcon={showPassword ? <EyeOffIcon /> : <EyeIcon />}
                        onRightIconClick={() => setShowPassword((prev) => !prev)}
                        autoComplete="current-password"
                    />
                    <Input
                        label="Confirm Password"
                        name="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        error={validationErrors.confirmPassword}
                        rightIcon={showPassword ? <EyeOffIcon /> : <EyeIcon />}
                        onRightIconClick={() => setShowPassword((prev) => !prev)}
                        autoComplete="current-password"
                    />

                    <Button type='submit' loading={loading} disabled={loading} className={styles.submit}>
                        Reset Password
                    </Button>
                </form>
            </>
    );
};
