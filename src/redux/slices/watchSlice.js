import { createSlice } from '@reduxjs/toolkit';

const watchSlice = createSlice({
    name: 'watched',
    initialState: {
      userWatched: [],
    },
    reducers: {
      setWatch: (state, action) => {
        state.userWatched = action.payload;
      },
      addWatch: (state, action) => {
        state.userWatched.push(action.payload);  // Yeni Watch-i Redux-a əlavə edir
      },
      removeWatch: (state, action) => {
        state.userWatched = state.userWatched.filter(watch => watch._id !== action.payload);  // Watch-i Redux-dan silir
      },
    },
  });
  

export const { setWatch, addWatch, removeWatch } = watchSlice.actions;

export default watchSlice.reducer;

