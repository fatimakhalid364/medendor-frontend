import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import styles from './BasicProfileForm.module.css';
import { Dropdown } from '@/components/ui/Dropdown';
import defaultAvatar from '@/assets/images/default-avatar.png';
import {ProfilePictureModal} from '@/components/onboarding/ProfilePictureModal'

import { genders } from '@/constants/enum';
import { COUNTRIES } from '@/data/countries';

import {useState} from 'react';
import { useCities } from '@/hooks/onboarding/basicProfile/useCities';
import { useProfilePicture } from '@/hooks/onboarding/basicProfile/useProfilePicture';
import { useBasicProfileForm } from '@/hooks/onboarding/basicProfile/useBasicProfileForm';

export const BasicProfileForm = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalOpenClick = () => setIsModalOpen(true);

    const handleModalCloseClick = () => setIsModalOpen(false);

     const {
        profilePicture,
        previewUrl,
        handleProfilePictureChange,
        handleProfilePictureDelete
    } = useProfilePicture();

    const {
        form,
        validationErrors,
        loading,
        handleChange,
        handleSubmit,
    } = useBasicProfileForm(profilePicture);

    const cities = useCities(form.country);

    return (
        <>
            <ProfilePictureModal 
                isModalOpen={isModalOpen}
                handleModalCloseClick={handleModalCloseClick}
                profilePicture={profilePicture}
                previewUrl={previewUrl}
                handleProfilePictureChange={handleProfilePictureChange}
                handleProfilePictureDelete={handleProfilePictureDelete}
            />
            <div className={styles.header}>
                <h3>Step 1 of 5</h3>
                <h2>Create your basic profile</h2>
            </div>

            <form
                className={styles.fields}
                onSubmit={handleSubmit}
                noValidate
            >
                <div className={styles.imgAndFields}>
                    <div className={styles.profilePicture}>
                        <img
                            src={previewUrl || defaultAvatar}
                            alt="Profile preview"
                            onClick={handleModalOpenClick}
                        />
                    </div>
                    <div className={styles.genderAndBirth}>
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
                            type="date"
                            placeholder="Select your date of birth"
                            value={form.dateOfBirth}
                            onChange={handleChange}
                            error={validationErrors.dateOfBirth}
                            max={new Date()
                                .toISOString()
                                .split('T')[0]}
                        />
                    </div>
                </div>

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

                <Button
                    type="submit"
                    loading={loading}
                    disabled={loading}
                    className={styles.submit}
                >
                    Save and Continue
                </Button>
            </form>
        </>
    );
};