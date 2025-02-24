import { apiSlice } from './apiSlice';

const BOOKMARK_URL = '/bookmark';

export const bookmarkhApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBookmark: builder.query({
      query: () => ({
        url: `${BOOKMARK_URL}`,
      }),
    }),
    addBookmark: builder.mutation({
      query: (Bookmark) => ({
        url: `${BOOKMARK_URL}`,
        method: 'POST',
        body: Bookmark,
      }),
    }),
    deleteBookmark: builder.mutation({
      query: (id) => ({
        url: `${BOOKMARK_URL}/${id}`,
        method: 'DELETE',

      }),
    }),
  }),
});

export const { useGetBookmarkQuery, useAddBookmarkMutation, useDeleteBookmarkMutation} = bookmarkhApiSlice;
