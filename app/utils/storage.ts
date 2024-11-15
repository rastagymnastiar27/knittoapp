export const saveToStorage = (key: string, value: string) => {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.error('Failed to save to storage', e);
    }
  };
  
  export const getFromStorage = (key: string) => {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.error('Failed to get from storage', e);
      return null;
    }
  };
  