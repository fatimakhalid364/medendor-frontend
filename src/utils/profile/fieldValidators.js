import {allowedMimeTypes} from '@/constants/enum';

export const validateProfilePicture = (file) => {

    const errors = {};

    if (!file){
        return;
    }

    if (!allowedMimeTypes.includes(file.type)) {
        errors.mimeType = 'Please select a JPEG, PNG or WEBP image'
    }

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
        errors.maxSize = 'Profile picture must be 5MB or smaller'
    }

    return errors;
}