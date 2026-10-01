import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { validateProfilePicture } from '@/utils/profile/fieldValidators';

export const useProfilePicture = () => {
    const [profilePicture, setProfilePicture] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

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

        const fileErrors = validateProfilePicture(file);

        if (Object.keys(fileErrors).length > 0) {
            const { maxSize, mimeType } = fileErrors;

            toast.error(maxSize || mimeType, {
                duration: 5000,
            });

            e.target.value = '';
            return;
        }

        setProfilePicture(file);

        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);
    };

    const handleProfilePictureDelete = () => {
        const file = e.target.files?.[0];

        if (!file) {
            return;
        }

        setProfilePicture(null);

        URL.revokeObjectURL(previewUrl);

        setPreviewUrl(null);
    }

    return {
        profilePicture,
        previewUrl,
        handleProfilePictureChange,
        handleProfilePictureDelete
    };
};