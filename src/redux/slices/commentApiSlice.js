import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const commentApi = createApi({
  reducerPath: 'commentApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api' }),
  endpoints: (builder) => ({
    getComments: builder.query({
      query: (movieId) => `/movies/${movieId}/comments`,
    }),
    addComment: builder.mutation({
      query: ({ movieId, text }) => ({
        url: `/movies/${movieId}/comments`,
        method: 'POST',
        body: { text },
      }),
    }),
  }),
});

export const { useGetCommentsQuery, useAddCommentMutation } = commentApi;
