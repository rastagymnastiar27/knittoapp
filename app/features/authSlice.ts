import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Tipe untuk state autentikasi
interface AuthState {
  token: string | null;
}

// State awal, token kosong
const initialState: AuthState = {
  token: null,
};

// Membuat slice untuk autentikasi
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action untuk menyimpan token
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    // Action untuk menghapus token
    removeToken: (state) => {
      state.token = null;
    },
  },
});

// Export action yang digunakan untuk menyimpan token
export const { setToken, removeToken } = authSlice.actions;

// Export reducer untuk dimasukkan ke dalam store
export default authSlice.reducer;
