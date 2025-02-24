import { apiSlice } from './apiSlice';

const ACTIVITY_URL = '/activity';

export const activityApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getActivity: builder.query({
      query: () => ({
        url: `${ACTIVITY_URL}`,
      }),
    }),
    addActivity: builder.mutation({
      query: (Activity) => ({
        url: `${ACTIVITY_URL}`,
        method: 'POST',
        body: Activity,
      }),
    }),
    deleteActivity: builder.mutation({
      query: (id) => ({
        url: `${ACTIVITY_URL}/${id}`,
        method: 'DELETE',

      }),
    }),
  }),
});

export const { useGetActivityQuery, useAddActivityMutation, useDeleteActivityMutation} = activityApiSlice;
