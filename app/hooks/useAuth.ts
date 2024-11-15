import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { saveToStorage, getFromStorage } from '../utils/storage';
import { setToken } from '../features/authSlice'; // Pastikan slice auth sudah ada

const useAuth = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const token = getFromStorage('token');
    if (token) {
      dispatch(setToken(token)); // Jika ada token, set token di Redux state
    }
  }, [dispatch]);

  const saveToken = (token: string) => {
    saveToStorage('token', token); // Simpan token ke storage
    dispatch(setToken(token)); // Set token ke Redux state
  };

  return { saveToken };
};

export default useAuth;
