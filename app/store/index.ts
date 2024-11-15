import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../api/authApi';
import { pixabayApi } from '../api/pixabayApi';
import bookmarkReducer from '../features/bookmarkSlice';
import authReducer from '../features/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
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
