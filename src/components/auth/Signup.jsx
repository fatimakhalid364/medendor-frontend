import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signupThunk } from '@/store/thunks/authThunks';
import { useNavigate } from 'react-router-dom';

export const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        role: ''
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
        localStorage.setItem('signupEmail', form.email);
        const res = await dispatch(signupThunk(form));
        console.log("response inside handleSubmit of Signup comp is", res);
        if (res.meta.requestStatus === 'fulfilled') {
        navigate('/authentication/verify-code');
        }
    };

    return (
        <div>
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
            <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
            />

            <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            />

            <input
            name="password"
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            />

            <input
            name="role"
            placeholder="Role"
            value={form.role}
            onChange={handleChange}
            required
            />
            <button type="submit" disabled={loading}>
                {loading ? 'Signing up...' : 'Sign up'}
            </button>
        </form>
        </div>
    );
};

