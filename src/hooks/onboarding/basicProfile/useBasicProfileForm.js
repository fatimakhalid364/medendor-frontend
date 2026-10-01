import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

import { validateBasicProfileForm } from '@/utils/profile/formValidators';
import { basicProfileThunk } from '@/store/thunks/profileThunks';

export const useBasicProfileForm = (profilePicture) => {
    const dispatch = useDispatch();

    const [status, setStatus] = useState('idle');

    const [form, setForm] = useState({
        gender: '',
        dateOfBirth: '',
        country: '',
        city: '',
    });

    const [validationErrors, setValidationErrors] = useState({});

    const loading = status === 'pending';

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formErrors = validateBasicProfileForm(form);

        if (Object.keys(formErrors).length > 0) {
            setValidationErrors(formErrors);
            return;
        }

        setValidationErrors({});

        try {
            setStatus('pending');

            const formData = new FormData();

            formData.append('gender', form.gender);
            formData.append('dateOfBirth', form.dateOfBirth);
            formData.append('country', form.country);
            formData.append('city', form.city);

            if (profilePicture) {
                formData.append('profilePicture', profilePicture);
            }

            const result = await dispatch(
                basicProfileThunk({
                    role: 'doctor',
                    data: formData,
                })
            ).unwrap();

            console.log(
                'Result inside handleSubmit:',
                result
            );

            setStatus('fulfilled');
        } catch (error) {
            setStatus('rejected');

            toast.error(error, {
                duration: 5000,
            });
        }
    };

    return {
        form,
        validationErrors,
        loading,
        handleChange,
        handleSubmit,
    };
};