import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiSlice, axiosBase } from "../apiSlice";

const API_URL = "/transactions";

export const eDispatchFindOrCreateByQrcode = createAsyncThunk(
  "transactions/edispatch-find-create-qrcode",
  async (data, thunkAPI) => {
    try {
      const response = await axiosBase.post(`${API_URL}/edispatch-find-create-qrcode`, data);

      return response.data;
    } catch (error) {
      const message = (error?.response && error.response?.data) || error?.message;

      // rejectWithValue sends the error message as a payload
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    openCreateByQrcodeSemai: builder.mutation({
      query: (data) => ({
        url: `${API_URL}/open-create-qrcode-semai`,
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: ["transaction"],
    }),
    getTransaction: builder.query({
      query: (data) => ({
        url: `${API_URL}`,
        method: "GET",
      }),
      providesTags: ["transport-vehicle"],
    }),
    searchManyTransaction: builder.query({
      query: (data) => ({
        url: `${API_URL}/search-many`,
        method: "POST",
        body: { ...data },
      }),
      providesTags: ["transaction"],
    }),
    searchManyDeletedTransaction: builder.query({
      query: (data) => ({
        url: `${API_URL}/search-many-deleted`,
        method: "POST",
        body: { ...data },
      }),
      providesTags: ["transaction"],
    }),
  }),
});

export const {
  useOpenCreateByQrcodeSemaiMutation,
  useGetTransactionQuery,
  useSearchManyTransactionQuery,
  useSearchManyDeletedTransactionQuery,
} = authApiSlice;
