import { apiSlice } from './apiSlice';

const WATCH_URL = '/watched';

export const watchApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWatch: builder.query({
      query: () => ({
        url: `${WATCH_URL}`,
      }),
    }),
    addWatch: builder.mutation({
      query: (Watch) => ({
        url: `${WATCH_URL}`,
        method: 'POST',
        body: Watch,
      }),
    }),
    deleteWatch: builder.mutation({
      query: (id) => ({
        url: `${WATCH_URL}/${id}`,
        method: 'DELETE',

      }),
    }),
  }),
});

export const { useGetWatchQuery, useAddWatchMutation, useDeleteWatchMutation } = watchApiSlice;
