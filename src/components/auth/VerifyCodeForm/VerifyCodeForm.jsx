import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyCodeThunk } from '@/store/thunks/authThunks';
import { useNavigate, Link } from 'react-router-dom';
import {validateVerifyCodeForm} from '@/utils/formValidators';
import styles from "./VerifyCodeForm.module.css";
import {Button} from '@/components/ui/Button';
import {OTPInput} from '@/components/ui/OTPInput';
import {clearVerifyCodeError} from '@/store/slices/authSlice';

export const VerifyCodeForm = () => {
    const [code, setCode] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const { status, error } = useSelector(
    //     (state) => state.auth.requestStatus.verifyCode
    // );

    const [status, setStatus] = useState('idle');
    const [error, setError] = useState(null);

    const loading = status === "pending";
    const [validationErrors, setValidationErrors] = useState({});

    const handleChange = (value)=> {

        setError(null);
        setCode(value);

    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = localStorage.getItem('signupEmail');

        if (!email){
            if (!email) {
                navigate("/authentication/signup", {
                    replace: true,
                    state: {
                        message: "We couldn't find your signup information. Please sign up again to receive a new verification code."
                    }
                });
            }
        }


        const newErrors = validateVerifyCodeForm(code);

        if (Object.keys(newErrors).length > 0) {
            setValidationErrors(newErrors);
            return;
        }
        setValidationErrors({});

        try {
            setStatus('pending');

            const res = await dispatch(verifyCodeThunk({ email, code })).unwrap();
            console.log("response inside handleSubmit of VerifyCode comp is", res);

            setStatus('fulfilled');
            localStorage.removeItem('signupEmail');
            navigate('/authentication/login');

        }catch(error){
            setStatus('rejected');
            setError(error.message);
            
        }
    };

    return (
        <>
            <div className={styles.header}>
                    <h2>Verify Code</h2>
                    <p className={styles.subtitle}>We've sent a 6-digit code to your email. Enter the code to verify your email</p>
                </div>

            {error && (
                <div className={styles.alert} role="alert">
                    {error}
                </div>
            )}
            <form className={styles.fields} onSubmit={handleSubmit}>
                <OTPInput
                    value={code}
                    onChange={handleChange}
                />
                {validationErrors.code && <p className={styles.errorText}>{validationErrors.code}</p>}
                <Button type='submit' loading={loading} disabled={loading}>Verify Code</Button>

            </form>
            <p className={styles.footer}>
                Didn't receive email? <Link to="/placeholder">Resend Verification Code</Link>
            </p>
        </>
    );
};
