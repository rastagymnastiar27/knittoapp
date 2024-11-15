import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const pixabayApi = createApi({
  reducerPath: 'pixabayApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://pixabay.com/api/',
    prepareHeaders: (headers, { getState }) => {
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getImages: builder.query({
      query: ({ query, page }) => ({
        url: '',
        params: {
          key: '47081337-8433ddb8c31f27dc9e144feb6',
          q: query,
          page: page,
          per_page: 20,
        },
      }),
    }),
  }),
});

export const { useGetImagesQuery } = pixabayApi;
