import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logoutThunk } from '@/store/thunks/authThunks';
import { resetAuthState } from '@/store/slices/authSlice';
import { persistor } from '@/store/inedex';
import { useNavigate } from 'react-router-dom';

export const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(logoutThunk()).then(() => {
        dispatch(resetAuthState());    
        persistor.purge();             
        navigate('/login');
        });
    }, [dispatch, navigate]);

    return <p>Logging out...</p>;
}


