import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginThunk } from '@/store/thunks/authThunks';
import { useNavigate } from 'react-router-dom';
import {Input} from '@/components/ui/Input';
import {Button} from '@/components/ui/Button';
import styles from "./LoginForm.module.css";
import { validateLoginForm } from '@/utils/formValidators';

export const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error } = useSelector((state) => state.auth);

    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const [validationErrors, setValidationErrors] = useState({});

    const handleChange = (e) => {
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
        const res = await dispatch(loginThunk(form));
        console.log("response inside handleSubmit of Login comp is", res);
        if (res.meta.requestStatus === "fulfilled") {
            const { role } = res.payload.user;
            navigate(`/${role}/dashboard`);
        }
    };

    return (
            <>
                <h2>Login</h2>

                <form className={styles.fields} onSubmit={handleSubmit}>
                    <Input
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        error={validationErrors.email}
                    />

                    <Input
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        error={validationErrors.password}
                    />
                    <Button type='submit' loading={loading} disabled={loading}>Login</Button>

                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </form>
            </>
    );
};


