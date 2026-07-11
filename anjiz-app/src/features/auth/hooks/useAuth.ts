/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/useAuthStore';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent, email: string, pass: string) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, pass);
      navigate('/dashboard'); 
    } catch (err) {
      alert('Login failed');
    } finally {
      setLoading(false);
    }
  };
  return { handleLogin, loading };
};