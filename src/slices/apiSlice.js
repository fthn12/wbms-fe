import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";

import { authSlice } from "./auth/authSlice";

const { REACT_APP_WBMS_BACKEND_API_URL } = process.env;

const { setCredentials, clearCredentials, setToken } = authSlice.actions;

export const axiosBase = axios.create({
  baseURL: `${REACT_APP_WBMS_BACKEND_API_URL}/`,
});

axiosBase.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const response = await refreshAccessToken();
      // console.log(response);
      // axios.defaults.headers.common["Authorization"] = "Bearer " + access_token;
      return axiosBase(originalRequest);
    }
    return Promise.reject(error);
  },
);

const refreshAccessToken = async () => {
  const response = await axiosBase.get(`auth/refresh`).catch((error) => {
    return {
      status: false,
      message: error.message,
      data: {
        error: error,
      },
    };
  });

  return response.data;
};

// =======================================

const baseQuery = fetchBaseQuery({
  baseUrl: `${REACT_APP_WBMS_BACKEND_API_URL}`,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const { token } = getState().auth;

    // if (token) {
    //   headers.set("authorization", `Bearer ${token}`);
    // }

    return headers;
  },
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    const { rt } = api.getState().auth;

    // console.log(args);
    // console.log(api);
    // console.log(extraOptions);
    // console.log("Sending refresh token.");

    // api.dispatch(setToken(rt));  // ini jika ingin dengan strategy gabungan cookies dan barrier token

    // send refresh token to get new access token
    const refreshResult = await baseQuery({ url: "/auth/refresh", method: "POST" }, api, extraOptions);

    // console.log("refresh result:", refreshResult);

    if (refreshResult?.data && refreshResult?.data?.status) {
      const { tokens } = refreshResult.data.data;
      const user = api.getState().auth.user;

      // store the new token
      api.dispatch(setCredentials({ tokens, user }));

      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(clearCredentials());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  // global configuration for the api
  refetchOnFocus: true,
  tagTypes: ["transaction", "province", "city", "product", "site", "storage-tank", "transport-vehicle", "user"],
  endpoints: (builder) => ({}),
});

// export default apiSlice;
