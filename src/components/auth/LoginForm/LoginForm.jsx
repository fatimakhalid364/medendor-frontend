import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginThunk } from '@/store/thunks/authThunks';
import { useNavigate, Link } from 'react-router-dom';
import {Input} from '@/components/ui/Input';
import {Button} from '@/components/ui/Button';
import styles from "./LoginForm.module.css";
import { validateLoginForm } from '@/utils/formValidators';
import {MailIcon, LockIcon, EyeIcon, EyeOffIcon} from '@/components/icons';
import { toast } from "sonner";


export const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const { status, error } = useSelector(
    //     (state) => state.auth.requestStatus.login
    // );

    const [status, setStatus] = useState('idle');
    // const [error, setError] = useState(null);

    const loading = status === "pending";

    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const [validationErrors, setValidationErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        // setError(null);
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
        try {
            setStatus('pending');
            const res = await dispatch(loginThunk(form)).unwrap();
            console.log("response inside handleSubmit of Login comp is", res);
            const { role } = res.user;
            setStatus('fulfilled');
            navigate(`/${role}/dashboard`);
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
                    <h2>Welcome back</h2>
                    <p className={styles.subtitle}>Sign in to continue to your Meden account</p>
                </div>

                {/* {error && (
                    <div className={styles.alert} role="alert">
                        {error}
                    </div>
                )} */}

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
