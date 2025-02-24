import { createSlice } from '@reduxjs/toolkit';

const activitySlice = createSlice({
    name: 'activity',
    initialState: {
      userActivity: [],
    },
    reducers: {
      setActivity: (state, action) => {
        state.userActivity = action.payload;
      },
      addActivity: (state, action) => {
        state.userActivity.push(action.payload);  // Yeni Watch-i Redux-a əlavə edir
      },
      removeActivity: (state, action) => {
        state.userActivity = state.userActivity.filter(activity => activity._id !== action.payload);  // Watch-i Redux-dan silir
      },
    },
  });
  

export const { setActivity, addActivity, removeActivity } = activitySlice.actions;

export default activitySlice.reducer;

