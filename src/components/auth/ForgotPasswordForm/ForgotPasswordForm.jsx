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
import {toast} from 'sonner';


export const ForgotPasswordForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const { status, error } = useSelector(
    //     (state) => state.auth.requestStatus.forgotPassword
    // );

    const [status, setStatus] = useState('idle');
    // const [error, setError] = useState(null);

    const loading = status === "pending";

    const [email, setEmail] = useState();

    const [validationErrors, setValidationErrors] = useState({});

    const handleChange = (e) => {

        if (e) {
            // setError(null);

            setEmail(e.target.value);
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

        try {
            setStatus('pending');
            const res = await dispatch(forgotPasswordThunk({email})).unwrap();
            console.log("response inside handleSubmit of forgotpassword comp is", res);
            setStatus('fulfilled');
        }catch(error){
            setStatus('rejected');
            // setError(error.message);
            toast.error(error.message, {
                duration: 3000,
            });
        }
      
        
    };

    return (
            <>
                <div className={styles.header}>
                    <h2>Password Recovery</h2>
                    <p className={styles.subtitle}>{
                        status === 'fulfilled' ? '' : `Enter the email associated to your Meden account`}
                    </p>
                </div>

                {/* {error && (
                    <div className={styles.alert} role="alert">
                        {error}
                    </div>
                )} */}

                {status === 'fulfilled' ? 
                    <div className={styles.emailMessage}>
                        <p >
                            {`If an account exists for ${email}, 
                            you will get an email with instructions on resetting 
                            your password. If it doesn't arrive, 
                            be sure to check your spam folder.`}
                        </p>

                    </div>
                    :
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
                }

                <p className={styles.footer}>
                    <Link to="/authentication/login">Back</Link>
                </p>
            </>
    );
};
