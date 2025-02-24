import { createSlice } from '@reduxjs/toolkit';

const likeSlice = createSlice({
    name: 'like',
    initialState: {
      userLike: [],
    },
    reducers: {
      setLike: (state, action) => {
        state.userLike = action.payload;
      },
      addLike: (state, action) => {
        state.userLike.push(action.payload);  // Yeni like-i Redux-a əlavə edir
      },
      removeLike: (state, action) => {
        state.userLike = state.userLike.filter(like => like._id !== action.payload);  // Like-i Redux-dan silir
      },
    },
  });
  

export const { setLike, addLike, removeLike } = likeSlice.actions;

export default likeSlice.reducer;

