// app/features/imageSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { pixabayApi } from "../api/pixabayApi";

interface ImageState {
  items: Array<any>;
  loading: boolean;
  error: string | null;
}

const initialState: ImageState = {
  items: [],
  loading: false,
  error: null,
};

const imageSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    setImages: (state, action: PayloadAction<Array<any>>) => {
      state.items = action.payload; // Menyimpan gambar baru ke dalam state
    },
    addImages: (state, action: PayloadAction<Array<any>>) => {
      state.items = [...state.items, ...action.payload]; // Menambahkan gambar baru ke dalam state
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        pixabayApi.endpoints.getPixabay.matchFulfilled,
        (state, action) => {
          state.items = action.payload.hits;
          state.loading = false;
        }
      )
      .addMatcher(pixabayApi.endpoints.getPixabay.matchPending, (state) => {
        state.loading = true;
      })
      .addMatcher(
        pixabayApi.endpoints.getPixabay.matchRejected,
        (state, action) => {
          state.loading = false;
          state.error = action.error.message || "Something went wrong"; // Menangani error
        }
      );
  },
});

export const { setImages, addImages } = imageSlice.actions;
export default imageSlice.reducer;
