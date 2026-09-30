import {genders} from '@/constants/enum';

export const validateBasicProfileForm = (form) => {
  const errors = {};


  if (!form.gender?.trim()){
    errors.gender = "Gender is required."
  }

  if (!errors.gender){
    if (!genders.includes(form.gender?.trim())){
        errors.gender = 'Gender can be either male, female or other.'
    }
  }

  if (!form.dateOfBirth){
    errors.dateOfBirth = 'Date of birth is required.'
  }

  if (!form.country?.trim()){
    errors.country = 'Country is required.'
  }

  if(!form.city?.trim()){
    errors.city = 'City is required.'
  }

  if (form.languagesSpoken && !form.languagesSpoken?.length){
    errors.languagesSpoken = 'Please add at least one language that you speak.'
  }


  return errors;
}