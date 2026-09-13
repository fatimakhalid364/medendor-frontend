import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyCodeThunk, resendVerificationCodeThunk } from '@/store/thunks/authThunks';
import { useNavigate, Link } from 'react-router-dom';
import {validateVerifyCodeForm} from '@/utils/formValidators';
import styles from "./VerifyCodeForm.module.css";
import {Button} from '@/components/ui/Button';
import {OTPInput} from '@/components/ui/OTPInput';
import {toast} from 'sonner';

export const VerifyCodeForm = () => {
    const [code, setCode] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const { status, error } = useSelector(
    //     (state) => state.auth.requestStatus.verifyCode
    // );

    const [status, setStatus] = useState('idle');
    const [resendCodeStatus, setResendCodeStatus] = useState('idle');
    const [resendCooldown, setResendCooldown] = useState(60);
    // const [error, setError] = useState(null);

    const loading = status === "pending";
    const resendCodeLoading = resendCodeStatus === "pending"
    const [validationErrors, setValidationErrors] = useState({});

    useEffect(() => {
        if (resendCooldown <= 0) return;

        const timer = setInterval(() => {
            setResendCooldown((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [resendCooldown]);



    const handleChange = (value)=> {

        // setError(null);
        setCode(value);

    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = localStorage.getItem('signupEmail');

        if (!email){
            navigate("/authentication/signup", {
                replace: true,
                state: {
                    message: "We couldn't find your signup information. Please sign up again to receive a new verification code."
                }
            });

            return;
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
            toast.success(res.message, {
                duration: 5000,
            })
            navigate('/authentication/login');

        }catch(error){
            setStatus('rejected');
            // setError(error.message);
            toast.error(error, {
                duration: 5000,
            });
        }
    };

    const handleResendCode = async (e) => {

        const email = localStorage.getItem('signupEmail');

        if (!email){
            navigate("/authentication/signup", {
                replace: true,
                state: {
                    message: "We couldn't find your signup information. Please sign up again to receive a new verification code."
                }
            });

            return;
        }

        try {
            setResendCodeStatus('pending');

            const res = await dispatch(resendVerificationCodeThunk({email})).unwrap();
            console.log("response inside handleResendCode of VerifyCode comp is", res);

            setResendCodeStatus('fulfilled');
            toast.success(res.message, {
                duration: 5000,
            })

            setResendCooldown(60);

        }catch(error){
            setResendCodeStatus('rejected');
            // setError(error.message);
            toast.error(error.message, {
                duration: 5000,
            });
        }
    };

    return (
        <>
            <div className={styles.header}>
                    <h2>Verify Code</h2>
                    <p className={styles.subtitle}>We've sent a 6-digit code to your email. Enter the code to verify your email</p>
                </div>

            {/* {error && (
                <div className={styles.alert} role="alert">
                    {error}
                </div>
            )} */}
            <form className={styles.fields} onSubmit={handleSubmit}>
                <OTPInput
                    value={code}
                    onChange={handleChange}
                />
                {validationErrors.code && <p className={styles.errorText}>{validationErrors.code}</p>}
                <Button type='submit' loading={loading} disabled={loading}>Verify Code</Button>

            </form>
            <p className={styles.footer}>
                <Button 
                    type='submit' 
                    variant='secondary' 
                    loading={resendCodeLoading} 
                    disabled={resendCooldown > 0}
                    onClick={handleResendCode}
                >
                    {resendCooldown > 0
                        ? `Resend Code (${resendCooldown}s)`
                        : "Resend Code"}
                </Button>
            </p>
        </>
    );
};
