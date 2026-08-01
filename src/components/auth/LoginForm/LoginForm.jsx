import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginThunk } from '@/store/thunks/authThunks';
import { useNavigate, Link } from 'react-router-dom';
import {Input} from '@/components/ui/Input';
import {Button} from '@/components/ui/Button';
import styles from "./LoginForm.module.css";
import { validateLoginForm } from '@/utils/formValidators';

const MailIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 6.5C3 5.67 3.67 5 4.5 5h15c.83 0 1.5.67 1.5 1.5v11c0 .83-.67 1.5-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5v-11Z" stroke="currentColor" strokeWidth="1.6"/>
        <path d="m4 6.5 8 6.5 8-6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const LockIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4.5" y="10.5" width="15" height="9.5" rx="2" stroke="currentColor" strokeWidth="1.6"/>
        <path d="M7.5 10.5V7.8a4.5 4.5 0 1 1 9 0v2.7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
);

const EyeIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
        <circle cx="12" cy="12" r="2.75" stroke="currentColor" strokeWidth="1.6"/>
    </svg>
);

const EyeOffIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 3l18 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M10.6 5.7c.45-.1.92-.14 1.4-.14 6.5 0 10 6.5 10 6.5a13.6 13.6 0 0 1-3.16 3.9M6.5 6.6C4.06 8.1 2 12 2 12s3.5 6.5 10 6.5c1.3 0 2.47-.26 3.5-.7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9.9 9.9a2.75 2.75 0 0 0 3.9 3.9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
);

export const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error } = useSelector((state) => state.auth);

    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const [validationErrors, setValidationErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
        ...prev,
        [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateLoginForm(form);

        if (Object.keys(newErrors).length > 0) {
            setValidationErrors(newErrors);
            return;
        }
        setValidationErrors({});
        const res = await dispatch(loginThunk(form));
        console.log("response inside handleSubmit of Login comp is", res);
        if (res.meta.requestStatus === "fulfilled") {
            const { role } = res.payload.user;
            navigate(`/${role}/dashboard`);
        }
    };

    return (
            <>
                <div className={styles.header}>
                    <h2>Welcome back</h2>
                    <p className={styles.subtitle}>Sign in to continue to your Medendor account</p>
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
