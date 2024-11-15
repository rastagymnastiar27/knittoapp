// api/pixabayApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const pixabayApi = createApi({
  reducerPath: 'pixabayApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pixabay.com/api/' }),
  endpoints: (builder) => ({
    getImages: builder.query({
      query: ({ query, page }) => ({
        url: '',
        params: {
          key: '47081337-8433ddb8c31f27dc9e144feb6', // Ganti dengan API key Anda
          q: query, // Kirimkan query yang dicari
          page: page,
          per_page: 20, // Jumlah gambar per halaman
        },
      }),
    }),
  }),
});

export const { useGetImagesQuery } = pixabayApi;
