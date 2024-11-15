import AsyncStorage from '@react-native-async-storage/async-storage';

// Fungsi untuk menyimpan data ke AsyncStorage
export const saveToStorage = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value); // Menyimpan data
  } catch (e) {
    console.error('Failed to save to storage', e);
  }
};

// Fungsi untuk mengambil data dari AsyncStorage
export const getFromStorage = async (key: string): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(key); // Mengambil data
  } catch (e) {
    console.error('Failed to get from storage', e);
    return null;
  }
};

// Fungsi untuk menghapus data dari AsyncStorage (opsional)
export const removeFromStorage = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key); // Menghapus data
  } catch (e) {
    console.error('Failed to remove from storage', e);
  }
};
