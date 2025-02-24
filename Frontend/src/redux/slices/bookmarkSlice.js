import { createSlice } from '@reduxjs/toolkit';

const bookmarkSlice = createSlice({
    name: 'bookmark',
    initialState: {
      userBookmark: [],
    },
    reducers: {
      setBookmark: (state, action) => {
        state.userBookmark = action.payload;
      },
      addBookmark: (state, action) => {
        state.userBookmark.push(action.payload);  // Yeni Watch-i Redux-a əlavə edir
      },
      removeBookmark: (state, action) => {
        state.userBookmark = state.userBookmark.filter(bookmark => bookmark._id !== action.payload);  // Watch-i Redux-dan silir
      },
    },
  });
  

export const { setBookmark, addBookmark, removeBookmark } = bookmarkSlice.actions;

export default bookmarkSlice.reducer;

