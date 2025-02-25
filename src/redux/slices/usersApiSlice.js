import { apiSlice } from "./apiSlice";
const USERS_URL = "https://backend-server.com/api/users"; // Tam URL əlavə edirik

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),
    getUsers: builder.query({
      query: () => ({
        url: `${USERS_URL}`,
        method: "GET",
      }),
    }),
    getUser: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: "GET",
      }),
    }),
    unfollowUser: builder.mutation({
      query: (userId) => ({
        url: `${USERS_URL}/unfollow`,
        method: "DELETE",
        body: { userId },
      }),
      invalidatesTags: ["User"],
    }),
    followUser: builder.mutation({
        query: ({ userIdToFollow }) => ({
          url: `${USERS_URL}/follow`,
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
  useGetUserQuery, // Burada artıq mövcuddur
} = userApiSlice;
