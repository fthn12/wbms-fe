import { apiSlice } from "../apiSlice";

const API_URL = "/edispatch";

const eDispatchApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    encodeQrcode: builder.mutation({
      query: (data) => ({
        url: `${API_URL}/encode-qrcode`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useEncodeQrcodeMutation } = eDispatchApiSlice;
