// src/slices/commentApiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// src/slices/commentApiSlice.js
export const commentApi = createApi({
    reducerPath: 'commentApi',
    baseQuery: fetchBaseQuery({
      baseUrl: 'http://localhost:5000/data', 
      prepareHeaders: (headers) => {
        const token = localStorage.getItem('token');  // Tokeni localStorage-dan götürürük
        if (token) {
          headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
      },
    }),
    endpoints: (builder) => ({
      addComment: builder.mutation({
        query: (commentData) => ({
          url: 'comments',
          method: 'POST',
          body: commentData,
        }),
      }),
    }),
  });
  
  
export const { useAddCommentMutation, useGetCommentsQuery } = commentApi;
