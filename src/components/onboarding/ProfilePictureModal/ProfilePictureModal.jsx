import { Modal } from "@/components/ui/Modal";
import {useState} from 'react';
import { Input } from '@/components/ui/Input';
import { useProfilePicture } from '@/hooks/onboarding/basicProfile/useProfilePicture';
import defaultAvatar from '@/assets/images/default-avatar.png';
import styles from './ProfilePictureModal.module.css';

export const ProfilePictureModal = ({
    isModalOpen,
    handleModalCloseClick,
    profilePicture,
    previewUrl,
    handleProfilePictureChange,
    handleProfilePictureDelete
}) => {

    return (
        <Modal isOpen={isModalOpen} onClose={handleModalCloseClick} title='Your Profile Picture'>
            <div className={styles.profilePicture}>
                <img
                    src={previewUrl || defaultAvatar}
                    alt="Profile preview"
                />
                <div className={styles.labels}>
                    <Input
                        label={
                            profilePicture
                                ? 'Change photo'
                                : 'Add photo'
                        }
                        name="profilePicture"
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleProfilePictureChange}
                        labelClassName={styles.imageLabel}
                        inputClassName={styles.fileInput}
                    />
                    <div onClick={handleProfilePictureDelete}>
                        {profilePicture ? 'Delete photo' : ''}
                    </div>
                </div>
            </div>
        </Modal>
    )
}