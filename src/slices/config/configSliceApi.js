import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiSlice, axiosBase } from "../apiSlice";

const API_URL = "/configs";

export const getConfigs = createAsyncThunk("configs", async (arg, thunkAPI) => {
  try {
    const response = await axiosBase.get(`${API_URL}`);

    return response.data;
  } catch (error) {
    const message = (error?.response && error.response?.data) || error?.message;

    // rejectWithValue sends the error message as a payload
    return thunkAPI.rejectWithValue(message);
  }
});

const configApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getENV: builder.query({
      query: (data) => ({
        url: `${API_URL}/env`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetENVQuery } = configApiSlice;
