import {Input} from '@/components/ui/Input';
import {Button} from '@/components/ui/Button';
import styles from "./BasicProfileForm.module.css";
import {Dropdown} from '@/components/ui/Dropdown';
import {useState, useEffect} from 'react';
import { toast } from "sonner";
import {genders, allowedMimeTypes} from '@/constants/enum';
import {COUNTRIES} from '@/data/countries';
import { getCitiesThunk } from '@/store/thunks/locationThunks';
import { useDispatch } from 'react-redux';
import {validateBasicProfileForm} from '@/utils/profile/formValidators';
import {basicProfileThunk} from '@/store/thunks/profileThunks';



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

    const [profilePicture, setProfilePicture] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

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

    useEffect(() => { 
        return () => { 
            if (previewUrl) { 
                URL.revokeObjectURL(previewUrl); 
            } 
        }; 
    }, [previewUrl]);

    const handleProfilePictureChange = (e) => {
        const file = e.target.files?.[0];

        if (!file) {
            return;
        }

        if (!allowedMimeTypes.includes(file.type)) {
            toast.error(
                'Please select a JPEG, PNG, or WebP image.',
                {
                    duration: 5000
                }
            );

            e.target.value = '';
            return;
        }

        const maxSize = 5 * 1024 * 1024;

        if (file.size > maxSize) {
            toast.error(
                'Profile picture must be 5 MB or smaller.',
                {
                    duration: 5000
                }
            );

            e.target.value = '';
            return;
        }

        // Store the actual File object
        setProfilePicture(file);

        // Create temporary preview
        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);
    };


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

            const formData = new FormData();

            formData.append('gender', form.gender);
            formData.append('dateOfBirth', form.dateOfBirth);
            formData.append('country', form.country);
            formData.append('city', form.city);

            if (profilePicture){
                 formData.append('profilePicture', profilePicture);
            }

            const result = await dispatch(basicProfileThunk({role: 'doctor', data: formData})).unwrap();
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
                    <div className={styles.imgAndFields}>
                        <div className={styles.profilePicture}>
                            <img
                                src={previewUrl || "/default-avatar.png"}
                                alt="Profile preview"
                            />
                            <Input
                                label={profilePicture ? "Change photo" : "Add photo"}
                                name="profilePicture"
                                type = "file"
                                accept="image/jpeg,image/png,image/webp"
                                onChange={handleProfilePictureChange}
                                className={styles.fileInput}
                            />

                            {/* <label
                                htmlFor="profilePicture"
                                className={styles.changePhoto}
                            >
                                {profilePicture ? "Change photo" : "Add photo"}
                            </label>

                            <input
                                id="profilePicture"
                                name="profilePicture"
                                type="file"
                                accept="image/jpeg,image/png,image/webp"
                                onChange={handleProfilePictureChange}
                                className={styles.fileInput}
                            /> */}
                        </div>
                    </div>
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