import { apiSlice } from './apiSlice';

const LIKE_URL = '/like';

export const likeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLike: builder.query({
      query: () => ({
        url: `${LIKE_URL}`,
      }),
    }),
    addLike: builder.mutation({
      query: (like) => ({
        url: `${LIKE_URL}`,
        method: 'POST',
        body: like,
      }),
    }),
    deleteLike: builder.mutation({
      query: (id) => ({
        url: `${LIKE_URL}/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useGetLikeQuery, useAddLikeMutation, useDeleteLikeMutation } = likeApiSlice;
