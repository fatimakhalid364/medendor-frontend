import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import {Input} from '@/components/ui/Input';
import {Button} from '@/components/ui/Button';
import styles from "./ForgotPasswordForm.module.css";
import { validateForgotPasswordForm } from '@/utils/formValidators';
import {MailIcon} from '@/components/icons';
import { clearForgotPasswordError } from "@/store/slices/authSlice";
import { forgotPasswordThunk } from '@/store/thunks/authThunks';


export const ForgotPasswordForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { status, error } = useSelector(
        (state) => state.auth.requestStatus.forgotPassword
    );

    const loading = status === "pending";

    const [email, setEmail] = useState();

    const [validationErrors, setValidationErrors] = useState({});

    const handleChange = (e) => {
        setEmail(e.target.value);
        if (e) {
            dispatch(clearForgotPasswordError());
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForgotPasswordForm(email);

        if (Object.keys(newErrors).length > 0) {
            setValidationErrors(newErrors);
            return;
        }
        setValidationErrors({});
        const res = await dispatch(forgotPasswordThunk(email));
        console.log("response inside handleSubmit of forgotpassword comp is", res);
        if (res.meta.requestStatus === "fulfilled") {
            navigate('/reset-password');
        }
    };

    return (
            <>
                <div className={styles.header}>
                    <h2>Password Recovery</h2>
                    <p className={styles.subtitle}>Enter the email associated to your Meden account</p>
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
                        value={email}
                        onChange={handleChange}
                        error={validationErrors.email}
                        icon={<MailIcon />}
                        autoComplete="email"
                    />

                    <Button type='submit' loading={loading} disabled={loading} className={styles.submit}>
                        Continue
                    </Button>
                </form>

                <p className={styles.footer}>
                    <Link to="/authentication/login">Back</Link>
                </p>
            </>
    );
};
