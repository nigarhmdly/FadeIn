import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import { apiSlice } from "./slices/apiSlice";
import ItemSlice  from "./slices/DataSlice";
import likeSlice  from "./slices/likeSlice";
import watchSlice  from "./slices/watchSlice";
import { likeApiSlice } from "./slices/likeApiSlice";
import { watchApiSlice } from "./slices/watchApiSlice";
import bookmarkSlice from "./slices/bookmarkSlice";
import { bookmarkhApiSlice } from "./slices/bookmarkApiSlice";
import activitySlice  from "./slices/activitySlice";
import { activityApiSlice } from "./slices/activityApiSlice";
import { commentApi } from "./slices/commentApiSlice";

const store = configureStore({
  reducer: {
    item: ItemSlice,
    auth: authSlice,
    like: likeSlice,
    bookmark: bookmarkSlice,
    watched: watchSlice,
    activity: activitySlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [likeApiSlice.reducerPath]: likeApiSlice.reducer,
    [activityApiSlice.reducerPath]: activityApiSlice.reducer,
    [watchApiSlice.reducerPath]: watchApiSlice.reducer,
    [bookmarkhApiSlice.reducerPath]: bookmarkhApiSlice.reducer,
    [commentApi.reducerPath]: commentApi.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(commentApi.middleware) 
      .concat(apiSlice.middleware)  
      .concat(likeApiSlice.middleware) 
      .concat(activityApiSlice.middleware) 
      .concat(watchApiSlice.middleware) 
      .concat(bookmarkhApiSlice.middleware)  
});

export default store;
