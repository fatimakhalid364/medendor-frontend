import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginThunk } from '@/store/thunks/authThunks';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error } = useSelector((state) => state.auth);

    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
        ...prev,
        [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await dispatch(loginThunk(form));
        console.log("response inside handleSubmit of Login comp is", res);
        const {role} = res.payload.user;
        console.log("role inside handleSubmit of Login comp is", role);
        if (res.meta.requestStatus === 'fulfilled') {
        navigate(`/${role}/dashboard`); 
        }
    };

    return (
        <div>
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
            <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            />

            <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            />

            <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Log In'}
            </button>

            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
        </div>
    );
};


