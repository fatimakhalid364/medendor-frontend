import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPasswordThunk } from '@/store/thunks/authThunks';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import {Input} from '@/components/ui/Input';
import {Button} from '@/components/ui/Button';
import styles from "./LoginForm.module.css";
import { validateResetPasswordForm } from '@/utils/formValidators';
import {MailIcon, LockIcon, EyeIcon, EyeOffIcon} from '@/components/icons';
import { clearLoginError } from "@/store/slices/authSlice";


export const ResetPasswordForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const resetToken = searchParams.get("token");

    // const { status, error } = useSelector(
    //     (state) => state.auth.requestStatus.login
    // );

    const [status, setStatus] = useState('idle');
    const [error, setError] = useState(null);

    const loading = status === "pending";

    const [form, setForm] = useState({
        password: '',
        confirmPassword: '',
    });

    const [validationErrors, setValidationErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setError(null);
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
            const res = await dispatch(resetPasswordThunk(form)).unwrap();
            console.log("response inside handleSubmit of reset password comp is", res);
            setStatus('fulfilled');
            navigate(`/login`);

        }catch(error){
            setStatus('rejected');
            setError(error.message);
        }
    };

    return (
            <>
                <div className={styles.header}>
                    <h2>Welcome back</h2>
                    <p className={styles.subtitle}>Sign in to continue to your Meden account</p>
                </div>

                {error && (
                    <div className={styles.alert} role="alert">
                        {error}
                    </div>
                )}

                <form className={styles.fields} onSubmit={handleSubmit} noValidate>
                    <Input
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={handleChange}
                        error={validationErrors.email}
                        icon={<MailIcon />}
                        autoComplete="email"
                    />

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
                    <div className={styles.linkBox}>
                        <Link className={styles.link} to="/authentication/forgot-password">Forgot Password?</Link>
                    </div>

                    <Button type='submit' loading={loading} disabled={loading} className={styles.submit}>
                        Login
                    </Button>
                </form>

                <p className={styles.footer}>
                    Don&apos;t have an account? <Link to="/authentication/signup">Sign up</Link>
                </p>
            </>
    );
};
