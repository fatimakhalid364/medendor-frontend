import {Input} from '@/components/ui/Input';
import {Button} from '@/components/ui/Button';
import styles from "./BasicProfileForm.module.css";
import {Dropdown} from '@/components/ui/Dropdown';
import {useState, useEffect} from 'react';
import { toast } from "sonner";
import {genders} from '@/constants/enum';
import {COUNTRIES} from '@/data/countries';
import { getCitiesThunk } from '@/store/thunks/locationThunks';
import { useDispatch } from 'react-redux';
import {validateBasicProfileForm} from '@/utils/profile/formValidators';
import {basicProfileThunk} from '@/store/thunks/profileThunks'


export const BasicProfileForm = () => {

    const [status, setStatus] = useState('idle');
    const loading = status === "pending";
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        gender: '',
        dateOfBirth: null,
        country: '',
        city: '',
    });

    const [validationErrors, setValidationErrors] = useState({});
    const [cities, setCities] = useState([]);

    useEffect(() => {
        setForm((prev)=> ({
            ...prev,
            city: ''
        }))
        const fetchCities = async () => {
            if (!form.country) {
                return;
            }

            try {
                const result = await dispatch(
                    getCitiesThunk(form.country)
                ).unwrap();

                setCities(result.cities);
            } catch (error) {
                toast.error(error, {
                    duration: 5000,
                });
                setCities([]);
            }
        };

        fetchCities();
    }, [form.country, dispatch]);


    const handleChange = (e) => {
        const {name, value} = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        const newErrors = validateBasicProfileForm(form);

        if (Object.keys(newErrors).length > 0){
            setValidationErrors(newErrors);
            return
        }

        setValidationErrors({});

        try {
            setStatus('pending');
            const result = await dispatch(basicProfileThunk({role: 'doctor', data: form})).unwrap();
            console.log('results inside handleSubmit of basicProfileForm is', result);
            setStatus('fulfilled')
        }catch(error){
            setStatus('rejected');
            toast.error(error, {
                duration: 5000,
            });
        }
    }
    return (
        <>
            <div className={styles.header}>
                <h3>Step 1 of 5</h3>
                <h2>Create your basic profile</h2>
            </div>
            <form className={styles.fields} onSubmit={handleSubmit} noValidate>
                <Dropdown
                    label="Gender"
                    name="gender"
                    value={form.gender}
                    options={genders}
                    placeholder="Select your gender"
                    onChange={handleChange}
                    error={validationErrors.gender}
                />

                <Input
                    label="Date of birth"
                    name="dateOfBirth"
                    type = "date"
                    placeholder="Select your date of birth"
                    value={form.dateOfBirth}
                    onChange={handleChange}
                    error={validationErrors.dateOfBirth}
                    max={new Date().toISOString().split("T")[0]}
                />

                <Dropdown
                    label="Country"
                    name="country"
                    value={form.country}
                    options={COUNTRIES}
                    placeholder="Select your country"
                    onChange={handleChange}
                    error={validationErrors.country}
                />

                <Dropdown
                    label="City"
                    name="city"
                    value={form.city}
                    options={cities}
                    placeholder="Select your city"
                    onChange={handleChange}
                    error={validationErrors.city}
                    disabled={!form.country}
                />

                <Button type='submit' loading={loading} disabled={loading} className={styles.submit}>
                    Save and Continue
                </Button>
            </form>
        </>
    )
}