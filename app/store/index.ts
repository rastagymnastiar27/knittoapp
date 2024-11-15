import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../api/authApi'; // Import authApi
import { pixabayApi } from '../api/pixabayApi'; // Import pixabayApi
import bookmarkReducer from '../features/bookmarkSlice'; // Reducer untuk bookmark
import authReducer from '../features/authSlice'; // Reducer untuk auth

const store = configureStore({
  reducer: {
    auth: authReducer, // Pastikan authReducer ditambahkan di sini
    [authApi.reducerPath]: authApi.reducer,
    [pixabayApi.reducerPath]: pixabayApi.reducer,
    bookmark: bookmarkReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, pixabayApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
