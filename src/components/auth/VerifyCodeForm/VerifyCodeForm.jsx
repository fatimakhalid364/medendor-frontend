import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyCodeThunk } from '@/store/thunks/authThunks';
import { useNavigate } from 'react-router-dom';

export const VerifyCode = () => {
    const [code, setCode] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { status, error } = useSelector(
        (state) => state.auth.requestStatus.signup
    );

    const loading = status === "pending";
    const [validationErrors, setValidationErrors] = useState({});


    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = localStorage.getItem('signupEmail');
        if (!email) {
            setError('No email found. Please sign up again.');
            return;
        }

        const res = await dispatch(verifyCodeThunk({ email, code }));
        console.log("response inside handleSubmit of VerifyCode comp is", res);

        if (res.meta.requestStatus === 'fulfilled') {
            localStorage.removeItem('signupEmail');
            navigate('/authentication/login'); // or wherever you want
        } else {
            setError(res.payload || 'Code verification failed');
        }
    };

    return (
        <div>
            <h2>Verify Code</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter verification code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Verifying...' : 'Verify'}
                </button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};
