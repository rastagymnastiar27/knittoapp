import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { saveToStorage, getFromStorage } from '../utils/storage';
import { setToken } from '../features/authSlice';

const useAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadToken = async () => {
      // Cek jika ada token yang tersimpan di AsyncStorage
      const token = await getFromStorage('token');
      if (token) {
        // Set token ke Redux store
        dispatch(setToken(token));
      }
    };

    loadToken(); // Memanggil fungsi asinkron untuk mengambil token
  }, [dispatch]);

  const saveToken = (token: string) => {
    // Simpan token ke AsyncStorage
    saveToStorage('token', token);
    // Simpan token ke Redux state
    dispatch(setToken(token));
  };

  return { saveToken };
};

export default useAuth;
