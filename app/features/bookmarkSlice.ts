import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bookmarkedImages: [] as any[],
};

const bookmarkSlice = createSlice({
  name: 'bookmark',
  initialState,
  reducers: {
    addBookmark: (state, action) => {
      state.bookmarkedImages.push(action.payload);
    },
    removeBookmark: (state, action) => {
      state.bookmarkedImages = state.bookmarkedImages.filter(
        (image) => image.id !== action.payload.id
      );
    },
  },
});

export const { addBookmark, removeBookmark } = bookmarkSlice.actions;

export default bookmarkSlice.reducer;
