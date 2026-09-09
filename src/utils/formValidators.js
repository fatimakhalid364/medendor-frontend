import {
  validateEmail, 
  validatePasswordRequired, 
  validatePasswordStrength
} from './fieldValidators'


export const validateLoginForm = (form) => {
  const errors = {};

  validateEmail(form.email, errors);
  validatePasswordRequired(form.password, errors);

  return errors;
};

export const validateSignupForm = (form) => {
  const errors = {};

  // First Name
  if (!form.firstName.trim()) {
    errors.firstName = "First name is required";
  }

  // Last Name
  if (!form.lastName.trim()) {
    errors.lastName = "Last name is required";
  }

  // Email
  validateEmail(form.email, errors);

  // Password
  validatePasswordRequired(form.password, errors);

  // Only check strength if password exists
  if (!errors.password) {
    validatePasswordStrength(form.password, errors);
  }

  // Confirm Password
  if (!form.confirmPassword) {
    errors.confirmPassword = "Please confirm your password";
  } else if (form.password !== form.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  // Role
  if (!form.role) {
    errors.role = "Please select a role";
  }

  return errors;
};

export const validateVerifyCodeForm = (code) => {
  const errors = {};


  if (!code?.trim()){
    errors.code = "Code is required."
  }

  if (code.length !== 6){
    errors.code = "Code must be of 6 digits."
  }

  return errors;
}

export const validateForgotPasswordForm = (email)=> {

  const errors = {};

  validateEmail(email, errors);

  return errors;
}

export const validateResetPasswordForm = (form) => {
  const errors = {};

  validatePasswordRequired(form.password, errors);

  if (!errors.password) {
    validatePasswordStrength(form.password, errors);
  }


  if (!form.confirmPassword) {
    errors.confirmPassword = "Please confirm your password";
  } else if (form.password !== form.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors

}