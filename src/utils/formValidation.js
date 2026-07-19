export const validateForm = (form) => {
    
    console.log('inide validateForm');
  const newErrors = {};

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!form.email) {
    newErrors.email = "Email is required";
  } 
  else if (!emailRegex.test(form.email)) {
    newErrors.email = "Please enter a valid email";
  }


  // Password validation
  if (!form.password) {
    newErrors.password = "Password is required";
  }

  return newErrors;
};