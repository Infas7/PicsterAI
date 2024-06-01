import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState('');

  const login = async (name, email, password) => {
    setIsloading(true);
    setError('');
    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      setError();
    }

    if (response.ok) {
      const data = await response.json();
    }
  };

  return isLoading, error, login;
};
