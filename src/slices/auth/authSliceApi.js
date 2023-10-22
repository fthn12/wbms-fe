import { apiSlice } from "../apiSlice";

const API_URL = "/auth";

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signin: builder.mutation({
      query: (data) => ({
        url: `${API_URL}/signin`,
        method: "POST",
        body: data,
      }),
    }),
    signout: builder.mutation({
      query: () => ({
        url: `${API_URL}/signout`,
        method: "POST",
      }),
    }),
    signup: builder.mutation({
      query: (data) => ({
        url: `${API_URL}/signup`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSigninMutation, useSignoutMutation, useSignupMutation } = authApiSlice;
