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
      state.items = action.payload;
    },
    addImages: (state, action: PayloadAction<Array<any>>) => {
      state.items = [...state.items, ...action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        pixabayApi.endpoints.getImages.matchFulfilled,
        (state, action) => {
          state.items = action.payload.hits;
          state.loading = false;
        }
      )
      .addMatcher(pixabayApi.endpoints.getImages.matchPending, (state) => {
        state.loading = true;
      })
      .addMatcher(
        pixabayApi.endpoints.getImages.matchRejected,
        (state, action) => {
          state.loading = false;
          state.error = action.error.message || "Something went wrong";
        }
      );
  },
});

export const { setImages, addImages } = imageSlice.actions;
export default imageSlice.reducer;
