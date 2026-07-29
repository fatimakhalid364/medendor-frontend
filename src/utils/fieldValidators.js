const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateEmail = (email, errors) => {
  if (!email) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(email)) {
    errors.email = "Please enter a valid email";
  }
};

export const validatePasswordRequired = (password, errors) => {
  if (!password) {
    errors.password = "Password is required";
  }
};

export const validatePasswordStrength = (password, errors) => {
  if (!password) return;

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

  if (!passwordRegex.test(password)) {
    errors.password =
      "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.";
  }
};