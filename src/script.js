import React from 'react';

const useToggleLoginSection = () => {
  const [isLoginVisible, setIsLoginVisible] = React.useState(true);

  const showLogin = () => setIsLoginVisible(true);
  const showSignUp = () => setIsLoginVisible(false);

  return { isLoginVisible, showLogin, showSignUp };
};

const useFormValidation = () => {
  const validatePasswords = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return false;
    }
    return true;
  };

  return { validatePasswords };
};

export { useToggleLoginSection, useFormValidation };
