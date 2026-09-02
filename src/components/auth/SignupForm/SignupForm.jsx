import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signupThunk } from '@/store/thunks/authThunks';
import { useNavigate } from 'react-router-dom';
import {Input} from '@/components/ui/Input';
import {Button} from '@/components/ui/Button';
import {Dropdown} from '@/components/ui/Dropdown';
import {roles} from '@/constants/roles';
import styles from "./SignupForm.module.css";
import { validateSignupForm } from '@/utils/formValidators';
import { clearSignupError } from "@/store/slices/authSlice";
import {MailIcon, LockIcon, EyeIcon, EyeOffIcon} from '@/components/icons';

export const SignupForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, error } = useSelector(
        (state) => state.auth.requestStatus.signup
    );

    const loading = status === "pending";
    const [validationErrors, setValidationErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
        if (e) {
        dispatch(clearSignupError());
    }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateSignupForm(form);

        if (Object.keys(newErrors).length > 0) {
            setValidationErrors(newErrors);
            return;
        }
        setValidationErrors({});
        localStorage.setItem('signupEmail', form.email);
        const { confirmPassword, ...signupData } = form;
        const res = await dispatch(signupThunk(signupData));
        console.log("response inside handleSubmit of Signup comp is", res);
        if (res.meta.requestStatus === 'fulfilled') {
        navigate('/authentication/verify-code');
        }
    };

    return (
        <>
                <div className={styles.header}>
                    <h2>Sign Up</h2>
                    <p className={styles.subtitle}>Sign up to become a part of Meden</p>
                </div>

                {error && (
                    <div className={styles.alert} role="alert">
                        {error}
                    </div>
                )}

                <form className={styles.fields} onSubmit={handleSubmit}>
                    <Input
                        label="First Name"
                        name="firstName"
                        type="text"
                        placeholder="First Name"
                        value={form.firstName}
                        onChange={handleChange}
                        error={validationErrors.firstName}
                    />
                    <Input
                        label="Last Name"
                        name="lastName"
                        type="text"
                        placeholder="Last Name"
                        value={form.lastName}
                        onChange={handleChange}
                        error={validationErrors.lastName}
                    />
                    <div className={styles.fullWidth}>
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
                    </div>
                   

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
                        icon={<LockIcon />}
                        rightIcon={showPassword ? <EyeOffIcon /> : <EyeIcon />}
                        onRightIconClick={() => setShowPassword((prev) => !prev)}
                        autoComplete="current-password"
                    />
                    <div className={styles.fullWidth}>
                        <Dropdown
                            label="Role"
                            name="role"
                            value={form.role}
                            options={roles}
                            placeholder="Select your role"
                            onChange={handleChange}
                            error={validationErrors.role}
                        />
                    </div>
                    <Button className={styles.fullWidth} type='submit' loading={loading} disabled={loading}>Signup</Button>

                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </form>
            </>
    );
};

