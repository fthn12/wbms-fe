import { apiSlice } from "../apiSlice";

const API_URL = "/storage-tanks";

const storageTankApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStorageTanks: builder.query({
      query: (data) => ({
        url: `${API_URL}`,
        method: "GET",
      }),
      providesTags: ["storage-tank"],
    }),
    searchManyStorageTanks: builder.query({
      query: (data) => ({
        url: `${API_URL}/search-many`,
        method: "POST",
        body: { ...data },
      }),
      providesTags: ["storage-tank"],
    }),
    eDispatchStorageTankSync: builder.mutation({
      query: () => ({
        url: `${API_URL}/edispatch-sync`,
        method: "GET",
      }),
      invalidatesTags: ["storage-tank"],
    }),
  }),
});

export const { useGetStorageTanksQuery, useSearchManyStorageTanksQuery, useEDispatchStorageTankSyncMutation } =
  storageTankApiSlice;
