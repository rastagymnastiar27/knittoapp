import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axiosClient from './axiosClient';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://pixabay.com/api/', // Ganti dengan base URL API kamu
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ username, password }) => ({
        url: '/login', // Endpoint login
        method: 'POST',
        body: { username, password },
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
