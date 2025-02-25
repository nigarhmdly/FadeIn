import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Backend URL
const BACKEND_URL = "https://backend-server.com/api";

// apiSlice
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BACKEND_URL,
    credentials: "include", // Cookies-in və ya JWT-nin düzgün göndərilməsi üçün
  }),
  tagTypes: ["User"], // Tag-lar istifadə edirik, beləliklə müəyyən müvafiq endpoints üçün invalidates edə bilərik
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/users/auth",
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/users/logout",
        method: "POST",
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: "/users/register",
        method: "POST",
        body: data,
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: "/users/profile",
        method: "PUT",
        body: data,
      }),
    }),
    getUsers: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
    }),
    getUser: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
    }),
    unfollowUser: builder.mutation({
      query: (userId) => ({
        url: "/users/unfollow",
        method: "DELETE",
        body: { userId },
      }),
      invalidatesTags: ["User"],
    }),
    followUser: builder.mutation({
      query: ({ userIdToFollow }) => ({
        url: "/users/follow",
        method: "POST",
        body: { userIdToFollow: userIdToFollow.toString() }, // Stringə çeviririk
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  useFollowUserMutation,
  useUnfollowUserMutation,
  useGetUsersQuery,
  useGetUserQuery,
} = apiSlice;
