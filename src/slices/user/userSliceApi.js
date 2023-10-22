import { apiSlice } from "../apiSlice";

const API_URL = "/users";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (data) => ({
        url: `${API_URL}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    searchManyUsers: builder.query({
      query: (data) => ({
        url: `${API_URL}/search-many`,
        method: "POST",
        body: { ...data },
      }),
      providesTags: ["user"],
    }),
    searchFirstUser: builder.mutation({
      query: (data) => ({
        url: `${API_URL}/search-first`,
        method: "POST",
        body: { ...data },
      }),
    }),
    createUser: builder.mutation({
      query: (data) => ({
        url: `${API_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useGetUsersQuery, useSearchManyUsersQuery, useSearchFirstUserMutation, useCreateUserMutation } =
  userApiSlice;
