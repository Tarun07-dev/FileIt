export const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

export const isStrongPassword = (password: string) => {
  const hasMinLength = password.length >= 6;
  const hasLetter = /[A-Za-z]/.test(password);
  const hasNumber = /\d/.test(password);

  return hasMinLength && hasLetter && hasNumber;
};

