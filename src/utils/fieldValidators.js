const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateEmail = (email, errors) => {
  if (!email?.trim()) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(email.trim())) {
      errors.email = "Please enter a valid email";
  }
};

export const validatePasswordRequired = (password, errors) => {
  if (!password) {
    errors.password = "Password is required";
  }
};

export const validatePasswordStrength = (password, errors) => {
  if (!password?.trim()) return;

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

  if (!passwordRegex.test(password)) {
    errors.password =
      "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.";
  }
};

// export const validateCode = (code, errors) => {
//   if (!code?.trim()){
//     errors.code = "Code is required."
//   }
//   if (code.length !== 6){
//     errors.code = "Code must be of 6 digits"
//   }
// }